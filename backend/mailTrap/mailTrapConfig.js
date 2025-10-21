import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();
import { RESEND_API_TOKEN } from "../config/env.js";

export const Client = new Resend(RESEND_API_TOKEN);
export const sender = "Using Resend <delivered@resend.dev>";
