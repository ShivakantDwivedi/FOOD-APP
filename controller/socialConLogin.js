import jwt from "jsonwebtoken";

export const defaultAuthGoogleLogin = async (req, res) => {
  try {
    const token = jwt.sign(req.user, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({
      status: 200,
      message: "Login successful",
      token,
      user: req.user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error", error });
  }
};
