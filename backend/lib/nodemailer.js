import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Nodemailer transporter setup
export const transporter = nodemailer.createTransport({
  service: "Gmail", // Use Gmail; you can replace it with another provider
  auth: {
    user: process.env.EMAIL_USER, // Your email address from environment variables
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});
