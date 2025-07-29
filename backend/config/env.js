import { config } from "dotenv";

config();

export const  MONGO_URI = process.env.MONGO_URI
export const  JWT_SECRET = process.env.JWT_SECRET
export const  MAILTRAP_TOKEN = process.env.MAILTRAP_TOKEN

console.log("token ", process.env.MONGO_URI)  // <--- this is the token you're looking for

export const {
    PORT,NODE_ENV,MAILTRAP_ENDPOINT
}=process.env;