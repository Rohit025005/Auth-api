import express from "express";
import {signUp,logIn,logOut, vefiryEmail} from '../controller/authController.js'
const authRouter = express();

authRouter.post('/sign-up',signUp);

authRouter.post('/log-in',logIn);

authRouter.post('/log-out',logOut);

authRouter.post('/verify-email',vefiryEmail);

export default authRouter;
//old=0aba3b6a5ec7a362c6a0744c2dcc8be1