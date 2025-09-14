import express from "express";
import {signUp,logIn,logOut, vefiryEmail, resetPassword, checkAuth, forgotPassword} from '../controller/authController.js'
import { verifyToken } from "../middleware/verifyToken.js";
const authRouter = express();

authRouter.get('/check-auth',verifyToken,checkAuth);

authRouter.post('/sign-up',signUp);

authRouter.post('/log-in',logIn);

authRouter.post('/log-out',logOut);

authRouter.post('/verify-email',vefiryEmail);

authRouter.post('/forgot-password',forgotPassword);

authRouter.post('/reset-password/:token',resetPassword);

export default authRouter;
//old=0aba3b6a5ec7a362c6a0744c2dcc8be1