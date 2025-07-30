import {Client,sender} from './mailTrapConfig.js';
import {VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE} from './emailTemplate.js';

export const sendVerificationEmail = async(email,verificationToken) =>{
    const reciepent = [{email}]
    try {
        const response = await Client.send({
            from:sender,
            to:reciepent,
            subject:"Verify Your Email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category:"Email Verification"
        });

        console.log("Email sent successfully", response);
    } catch (error) {
        console.error("error in sending the verification email", error.message);
    }
}

export const sendWelcomEmail = async(email,username)=>{
    const reciepent = [{email}]
    try {
        const response = await Client.send({
            from:sender,
            to:reciepent,
            subject:"Verify Your Email",
            html:WELCOME_EMAIL_TEMPLATE.replace("{userName}",username),
            category:"Email Verification"
        });
    
        console.log("Welcome Email sent successfully", response);
    } catch (error) {
        console.error("error in sending the verification email", error.message);
    }

}