import express from "express";
import DBConnection from "./backend/db/db.js"
import  authRoute  from "./backend/route/authRoute.js";
import  dotenv  from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const PORT = 5500
app.use('/api/auth',authRoute);


app.listen(PORT,()=>{
    DBConnection();
    console.log(`Server is running on port http://localhost:${PORT}`);
})