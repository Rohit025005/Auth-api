import User from '../models/userModel.js'
import bcrypt from'bcrypt'
import { generateTokenAndSetCokkies } from '../utils/generateTokenAndSetCookies.js';



export const signUp = ('/sign-up',async (req,res)=>{
    const {name,email,password} = req.body;
    try {
        if(!name || !email || !password){
            throw new Error("All fields required");
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({ success: false, message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const verificationToken = Math.floor(10000 + Math.random()*90000).toString();
        const user = await User.create({
            name:name,
            email:email,
            password:hashedPassword,
            verificationToken,
            verificationToken:Date.now + 24 *60*60*1000 //24 hrs
        });

        await user.save();

        generateTokenAndSetCokkies(req,res,user_id);

        await verificationEmail();

        res.status(200),send({
            success: true,
            message: "User created successfully",
        });
    } catch (error) {
        console.error("error while creating New user",error.message);
    }
});
export const logIn =('/log-in',()=>{
    // code to handle log-in
});
export const logOut=('/log-out',()=>{
    // code to handle log-out
});