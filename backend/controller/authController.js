import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import generateTokenAndSetCookies from '../utils/generateTokenAndSetCookies.js';
import { sendVerificationEmail, sendWelcomEmail } from '../mailTrap/emails.js';

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();


    console.log('Creating new user',verificationToken);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hrs
    });
    await user.save();
    console.log('New user saved');

    generateTokenAndSetCookies(res, user._id);

    await sendVerificationEmail(user.email, verificationToken);
    console.log('Verification email sent');

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: null,
      },
    });

    console.log('Sign up done');
  } catch (error) {
    console.error("Error while creating new user:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const vefiryEmail = async (req,res)=>{

  try {
    const { otp } = req.body;
  
    const user = await User.findOne({
      verificationToken:otp,
      verificationTokenExpiresAt: {$gt:Date.now()}
    });
  
    if(!user) return res.status(401).json({success:false,message:"Invalid or Expired Verification Token"});
  
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
  
    //otp verified now update the user in db
    await sendWelcomEmail(user.email,user.name);
    res.status(201).json({
      success: true,
      message: "Email Verified  successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(401);
    console.error("something went in verification email",error.message);
  }

};


export const logIn =('/log-in',()=>{
    // code to handle log-in
});
export const logOut=('/log-out',()=>{
    // code to handle log-out
});