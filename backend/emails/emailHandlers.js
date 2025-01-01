import { transporter } from "../lib/nodemailer.js";
import {
  createWelcomeEmailTemplate,
  createConnectionAcceptedEmailTemplate,
  createCommentNotificationEmailTemplate,
} from "../emails/emailTemplates.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Define sender email
const sender = process.env.EMAIL_USER;

// Function to send a welcome email
export const sendWelcomeEmail = async (email, name, profileUrl) => {
  try {
    const mailOptions = {
      from: sender,
      to: email,
      subject: "Welcome to UnLinked",
      html: createWelcomeEmailTemplate(name, profileUrl),
    };

    const response = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw error;
  }
};

// Function to send a comment notification email
export const sendCommentNotificationEmail = async (
  recipientEmail,
  recipientName,
  commenterName,
  postUrl,
  commentContent
) => {
  try {
    const mailOptions = {
      from: sender,
      to: recipientEmail,
      subject: "New Comment on Your Post",
      html: createCommentNotificationEmailTemplate(
        recipientName,
        commenterName,
        postUrl,
        commentContent
      ),
    };

    const response = await transporter.sendMail(mailOptions);
    console.log("Comment notification email sent successfully", response);
  } catch (error) {
    console.error("Error sending comment notification email:", error);
    throw error;
  }
};

// Function to send a connection accepted email
export const sendConnectionAcceptedEmail = async (
  senderEmail,
  senderName,
  recipientName,
  profileUrl
) => {
  try {
    const mailOptions = {
      from: sender,
      to: senderEmail,
      subject: `${recipientName} accepted your connection request`,
      html: createConnectionAcceptedEmailTemplate(
        senderName,
        recipientName,
        profileUrl
      ),
    };

    const response = await transporter.sendMail(mailOptions);
    console.log("Connection accepted email sent successfully", response);
  } catch (error) {
    console.error("Error sending connection accepted email:", error);
    throw error;
  }
};
