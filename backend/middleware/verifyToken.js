import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';

export const verifyToken = (req,res,next) =>{
    const token = req.cookies.token;
    if(!token)  
      return res.status(401).json({
    success:false,
    message:"Unauthorized - No token provided"
    });  

    try {
        const decoded = jwt.verify(token,JWT_SECRET);

        if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
        req.userId = decoded.userId;
		next();
	} catch (error) {
		console.log("Error in verifyToken ", error);
		return res.status(500).json({ success: false, message: "Server error" });
	}
}