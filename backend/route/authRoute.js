import express from "express";
import {signUp,logIn,logOut} from '../route/authRoute.js'
const authRouter = express();

authRouter.post('/sign-up',signUp);
authRouter.post('/log-in',logIn);
authRouter.post('/log-out',logOut);

export default authRouter;
