import Joi from "joi";

export const signUpSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().min(6).required(),
  mobile: Joi.string()
    .length(10)
    .pattern(/[6-9]{1}[0-9]{9}/)
    .optional(),
  gender: Joi.string().valid("Male", "Female", "Other").optional(),
  role: Joi.string()
    .valid("user", "restaurantOwner", "deliveryPerson")
    .required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const editProfileSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  mobile: Joi.string()
    .length(10)
    .pattern(/[6-9]{1}[0-9]{9}/)
    .optional(),
  location: Joi.string().optional(),
});

export const addProductSchema = Joi.object({
  shopName: Joi.string().trim().required(),
  item: Joi.string().trim().required(),
  amount: Joi.number().min(0).required(),
  quantity: Joi.number().min(1).required(),
  description: Joi.string().trim().optional().allow(""),
  category: Joi.string()
    .valid("Food", "Beverage", "Dessert", "Snack", "Other")
    .required(),
  status: Joi.string()
    .valid("Pending", "Delivered", "Cancelled")
    .optional()
    .default("Pending"),
  images: Joi.array().items(Joi.string().uri()).default([]),
  tags: Joi.array().items(Joi.string().trim()).default([]),
  isAvailable: Joi.boolean().optional().default(true),
  shopLocation: Joi.string().trim().optional(),
  ratings: Joi.array().items(Joi.number().min(1).max(5)).optional(),
});
