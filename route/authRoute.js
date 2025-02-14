import express from "express";
import { login, signUp, changePassword } from "../controller/auth.js";
import { sendDynamicOTP, verifyOTP } from "../controller/otp.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);
router.post("/sendOTP", sendDynamicOTP);
router.post("/verifyOTP", verifyOTP);
router.post("/changePassword", changePassword);

export default router;
