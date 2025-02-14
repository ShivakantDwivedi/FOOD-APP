import nodemailer from "nodemailer";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_PHONE_NUMBER
);

export async function sendEmail(email, otp) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_OTP,
        pass: process.env.OTP_PASS,
      },
    });

    const mailOptions = {
      from: "shivakant1472002@gmail.com",
      to: email,
      subject: "Your OTP Code",
      html: `<h1>OTP Verification</h1>
             <p>Your OTP is: <strong>${otp}</strong></p>
             <p>This OTP is valid for 5 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export async function sendSMS(phone, otp) {
  try {
    const message = await client.messages.create({
      body: `Your OTP is ${otp}. It is valid for 5 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    console.log(`SMS sent successfully to ${phone}: SID ${message.sid}`);
  } catch (error) {
    console.error("Error sending SMS:", error.message);
    throw error;
  }
}
