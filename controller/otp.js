import otpGenerator from "otp-generator";
import { sendEmail, sendSMS } from "../utils/mailSender.js";

export async function sendDynamicOTP(req, res) {
  try {
    const { email, phone } = req.body; // Assuming both `email` and `phone` come in the request body

    if (!email && !phone) {
      return res.status(400).json({
        success: false,
        message: "Email or phone number is required",
      });
    }

    // Generate a 6-digit OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    // Send OTP via email if `email` is provided
    if (email) {
      await sendEmail(email, otp);
    }

    // Send OTP via SMS if `phone` is provided
    if (phone) {
      await sendSMS(phone, otp);
    }

    // Respond with success
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: error.message,
    });
  }
}
