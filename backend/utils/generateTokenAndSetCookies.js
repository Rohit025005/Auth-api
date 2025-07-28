import jwt from'jsonwebtoken'
import { JWT_SECRET,NODE_ENV } from "../config/env.js";

export const generateTokenAndSetCokkies = (res,userId) =>{
    const token = jwt.sign({userId},JWT_SECRET ,{
        expiresIn:'1d'
    });

    res.cookie("token",token,{
        httpOnly: true,
		secure: NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 7 * 24 * 60 * 60 * 1000,
        
    });
}