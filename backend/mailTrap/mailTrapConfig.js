
//import { MailtrapClient } from "mailtrap";
import { Resend } from "resend";
import dotenv from "dotenv"; 
dotenv.config();

import { MAILTRAP_TOKEN ,RESEND_API_TOKEN} from "../config/env.js";

  const Client = new Resend(RESEND_API_TOKEN);

  const sender = "Using Resend <delivered@resend.dev>";

export { Client, sender };


//    <------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
/**
 mailtrap using nodemailer
 */


// import dotenv from "dotenv"; // Import dotenv
// dotenv.config(); // Add this line to load .env variables when run separately

// import { MAILTRAP_TOKEN } from "../config/env.js";
// import  Nodemailer  from "nodemailer";
// import  MailtrapTransport  from "mailtrap";



// const TOKEN = "2969d8b3816e0db427f538b33a0d9cae";

// const transport = Nodemailer.createTransport(
//   MailtrapTransport({
//     token: TOKEN,
//   })
// );

// const sender = {
//   address: "hello@demomailtrap.co",
//   name: "Mailtrap Test",
// };
// const recipients = [
//   "matsudaisidiot@gmail.com",
// ];

// transport
//   .sendMail({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);
