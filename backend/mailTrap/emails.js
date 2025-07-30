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


export const sendResetPasswordEmail = async(email,resetUrl)=>{
    const reciepent = [{email}]
    try {
        const response = await Client.send({
            from:sender,
            to:reciepent,
            subject:"Reset Your Password",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetUrl),
            category:"Reset password"
        });
    
        console.log("reset password Email sent successfully", response);
    } catch (error) {
        console.error("error in sending the forgot password email", error.message);
    }
}


export const sendResetSuccessEmail = async(email)=>{
     const reciepent = [{email}]
    try {
        const response = await Client.send({
            from:sender,
            to:reciepent,
            subject:" Your Password has been reset",
            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
            category:"Reset password Success"
        });
    
        console.log("reset password Email sent successfully", response);
    } catch (error) {
        console.error("error in sending the  forgot password 'success' email", error.message);
    }
}