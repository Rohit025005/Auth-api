import express from "express";
import {signUp, logIn, logOut, verifyEmail, resetPassword, checkAuth, forgotPassword} from '../controller/authController.js'
import { verifyToken } from "../middleware/verifyToken.js";
const authRouter = express();

authRouter.get('/check-auth',verifyToken,checkAuth);

authRouter.post('/sign-up',signUp);

authRouter.post('/log-in',logIn);

authRouter.post('/log-out',logOut);

authRouter.post('/verify-email',verifyEmail);

authRouter.post('/forgot-password',forgotPassword);

authRouter.post('/reset-password/:token',resetPassword);

export default authRouter;
