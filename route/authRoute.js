import express from "express";
import { login, signUp } from "../controller/auth.js";
import { sendDynamicOTP } from "../controller/otp.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);
router.post("/sendOTP", sendDynamicOTP);

export default router;
