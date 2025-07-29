import jwt from 'jsonwebtoken';
import { JWT_SECRET, NODE_ENV } from "../config/env.js";

console.log('Token generator loaded');

 const generateTokenAndSetCookies = (res, userId) => {
    try {
        console.log('Generating token for userId:', userId); 
        
        
        if (!userId) {
            throw new Error('UserId is required for token generation');
        }
        
        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }
        
        const token = jwt.sign({ userId }, JWT_SECRET, {
            expiresIn: '1d'
        });
        
        res.cookie("token", token, {
            httpOnly: true, // Protects against XSS attacks
            secure: NODE_ENV === "production", // Only send over HTTPS in production
            sameSite: "strict", // Prevents CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        
        console.log('Token generated and cookie set successfully');
        return token;
        
    } catch (error) {
        console.error('Error generating token:', error.message);
        throw error; // Re-throw so calling function can handle it
    }
}

export default generateTokenAndSetCookies;