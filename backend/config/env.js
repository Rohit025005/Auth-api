import { config } from "dotenv";

config();

export const {
    PORT,
    MONGI_URI,
    JWT_SECRET,NODE_ENV
}=process.env;