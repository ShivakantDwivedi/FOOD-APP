import User from "../module/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { signUpSchema, loginSchema } from "../validation/authValidation.js";

export const signUp = async (req, res) => {
  try {
    const { error, value } = signUpSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: 400,
        message: "Validation Error",
        details: error.details.map((err) => err.message),
      });
    }

    const existingUser = await User.findOne({ email: value.email });

    if (existingUser) {
      return res.status(409).json({
        status: 409,
        message: "Email already in use",
      });
    }

    const newUser = await User.create(value);

    return res.status(201).json({
      status: 201,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Sign Up Error:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: 400,
        message: "Validation Error",
        details: error.details.map((err) => err.message),
      });
    }

    const verifyUser = await User.findOne({ email: value.email });

    if (!verifyUser) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      value.password,
      verifyUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        status: 401,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: verifyUser._id, email: verifyUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      status: 200,
      message: "Login successful",
      data: {
        userId: verifyUser._id,
        email: verifyUser.email,
        token,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
