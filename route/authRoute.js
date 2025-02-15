import express from "express";
import { login, signUp, changePassword } from "../controller/auth.js";
import { sendDynamicOTP, verifyOTP } from "../controller/otp.js";
import { editProfileDetails } from "../controller/profile.js";
import authorize from "../middleware/authMiddle.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);
router.post("/sendOTP", sendDynamicOTP);
router.post("/verifyOTP", verifyOTP);
router.post("/changePassword", changePassword);
router.put("/editProfile", authorize, editProfileDetails);

export default router;
