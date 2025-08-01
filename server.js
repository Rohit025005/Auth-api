import express from "express";
import cookieParser from "cookie-parser";
import DBConnection from "./backend/db/db.js"
import  authRoute  from "./backend/route/authRoute.js";
import  dotenv  from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = 5500
app.use('/api/auth',authRoute);


app.listen(PORT,()=>{
    DBConnection();
    console.log(`Server is running on port http://localhost:${PORT}`);
})