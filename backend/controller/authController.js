import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import generateTokenAndSetCookies from '../utils/generateTokenAndSetCookies.js';
import { sendResetPasswordEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomEmail } from '../mailTrap/emails.js';
import { CLIENT_URL } from '../config/env.js';

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
    res.status(501).json({
      success: false,
      message: "Internal server error",
    });
    console.error("something went in verification email",error.message);
  }

};


export const logIn =async(req,res)=>{
  const{email,password} = req.body;
  if(!email ||!password ){
    return res.status(401).json({
      success:false,
      message:"Email and Password are required"
    });
  }
  try {
    const user = await User.findOne({email});
    if(!user) 
      return res.status(401).json({
        success:false,
        message:"Incorrect Email "
      });

      const isPassValid = await bcrypt.compare(password,user.password);
      if(!isPassValid) return res.status(401).json({
        success:false,
        message:"Incorrect Password "
      });

      generateTokenAndSetCookies(email,req._id);

      user.lastLogin = Date.now();

      await user.save();

      res.status(201).json({
      success: true,
      message: "User Logged in  successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });

  } catch (error) {
    res.status(501).json({
      success: false,
      message: "Internal server error",
    });
    console.error("something went in user log in",error.message);
  }
}


export const logOut=(req,res)=>{
 res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
}



export const forgotPassword = async(req,res)=>{
  const {email} = req.body;
  
  if(!email){
    return res.status(401).json({
      success:false,
      message:"Email  required"
    });
  }

  try {
    const user = await User.findOne({email});
    if(!user) 
      return res.status(401).json({
        success:false,
        message:"Incorrect Email "
      });

      // generate new token
      const resetToken = crypto.randomBytes(20).toString("hex");
      const resetTokenExpAt = new Date(Date.now()  + 1 *60 *60*1000 ); //1hr

      user.resetPasswordToken=resetToken;
      user.resetPasswordExpiresAt=resetTokenExpAt;

      //saVE   the info
      await user.save();

      //send email
      await sendResetPasswordEmail(user.email,`${CLIENT_URL}/reset-password/${resetToken}`);

      return res.status(201).json({
        success: true,
        message: "Password reset link sent to your email",
      });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error resetting password",
    })
    console.error("error in forgot password",error.message);
  }
}

export const resetPassword = async(req,res)=>{
  try {
    const token = req.params;
    const newpass = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() }
    });

    if(!user)  
      return res.status(401).json({
    success:false,
    message:"Invalid or expired password reset token "
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpiresAt = null;

    await user.save();

    sendResetSuccessEmail(user.email);
    return res.status(201).json({
      success: true,
      message:"password reset succesful"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error resetting password",
    })
    console.error("error in reset password (the link one)",error.message);
  
  }
}

export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
}