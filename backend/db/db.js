import mongoose from 'mongoose';
import { MONGI_URI } from '../config/env.js';

export const DBConnection = async ()=>{
 try{
    await mongoose.connect(MONGI_URI);
    console.log("connected to database");
 }catch(error){
    console.error("error while connecting to database", error.message);
 }   
}