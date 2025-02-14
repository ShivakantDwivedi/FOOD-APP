import otpGenerator from "otp-generator";
import { sendEmail, sendSMS } from "../utils/mailSender.js";
import OTP from "../module/otpModel.js";

export async function sendDynamicOTP(req, res) {
  try {
    const { email, phone } = req.body;

    if (!email && !phone) {
      return res.status(400).json({
        success: false,
        message: "Email or phone number is required",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    if (email) {
      await sendEmail(email, otp);
    }

    if (phone) {
      await sendSMS(phone, otp);
    }

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await OTP.deleteMany({ $or: [{ email }, { phone }] });

    await OTP.create({
      email: email || null,
      phone: phone || null,
      otp,
      expiresAt,
    });

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

export async function verifyOTP(req, res) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    const otpRecord = await OTP.findOne({ email });

    if (!otpRecord) {
      return res.status(404).json({
        success: false,
        message: "No OTP found for the provided email.",
      });
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    const isExpired =
      otpRecord.createdAt.getTime() + 5 * 60 * 1000 < Date.now();
    if (isExpired) {
      await OTP.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    await OTP.deleteOne({ _id: otpRecord._id });

    res.status(200).json({
      success: true,
      message:
        "OTP verified successfully. You may proceed to reset your password.",
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({
      success: false,
      message: "Failed to verify OTP.",
      error: error.message,
    });
  }
}
