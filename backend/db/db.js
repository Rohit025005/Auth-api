import mongoose from 'mongoose';
import { MONGO_URI,MAILTRAP_TOKEN } from '../config/env.js';

 const DBConnection = async ()=>{
 try{
    await mongoose.connect(MONGO_URI);
    console.log("connected to database: ");
 }catch(error){
    console.error("error while connecting to database", error.message);
 }   
}

export default DBConnection;