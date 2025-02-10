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
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
