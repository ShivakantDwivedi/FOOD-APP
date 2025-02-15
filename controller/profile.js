import User from "../module/userModel.js";
import { editProfileSchema } from "../validation/authValidation.js";

export const editProfileDetails = async (req, res) => {
  try {
    const { error } = editProfileSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.details[0].message,
      });
    }

    const userId = req.auth;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Invalid token.",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const allowedFields = ["name", "email", "phone", "location"];
    let isUpdated = false;

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
        isUpdated = true;
      }
    });

    if (!isUpdated) {
      return res.status(400).json({
        success: false,
        message: "No fields to update. Please provide valid data.",
      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};
