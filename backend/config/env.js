import { config } from "dotenv";

config();

export const  MONGO_URI = process.env.MONGO_URI
export const  JWT_SECRET = process.env.JWT_SECRET
export const  MAILTRAP_TOKEN = process.env.MAILTRAP_TOKEN



export const {
    PORT,NODE_ENV,MAILTRAP_ENDPOINT,CLIENT_URL
}=process.env;