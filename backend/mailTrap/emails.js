import { Client, sender } from "./mailTrapConfig.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE
} from "./emailTemplate.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    await Client.emails.send({
      from: sender,
      to: [email],
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
      category: "Email Verification",
    });
    console.log("Verification email sent");
  } catch (error) {
    console.error("Error sending verification email:", error.message);
  }
};

export const sendWelcomeEmail = async (email, username) => {
  try {
    await Client.emails.send({
      from: sender,
      to: [email],
      subject: "Welcome!",
      html: WELCOME_EMAIL_TEMPLATE.replace("{userName}", username),
      category: "Welcome Email",
    });
    console.log("Welcome email sent");
  } catch (error) {
    console.error("Error sending welcome email:", error.message);
  }
};

export const sendResetPasswordEmail = async (email, resetUrl) => {
  try {
    await Client.emails.send({
      from: sender,
      to: [email],
      subject: "Reset Your Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
      category: "Password Reset",
    });
    console.log("Password reset email sent");
  } catch (error) {
    console.error("Error sending password reset email:", error.message);
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    await Client.emails.send({
      from: sender,
      to: [email],
      subject: "Your Password Has Been Reset",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset Success",
    });
    console.log("Reset success email sent");
  } catch (error) {
    console.error("Error sending reset success email:", error.message);
  }
};
