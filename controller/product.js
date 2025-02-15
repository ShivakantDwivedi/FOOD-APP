import Product from "../module/productModel.js";
import { addProductSchema } from "../validation/authValidation.js";

export const addProduct = async (req, res) => {
  try {
    const { error, value } = addProductSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        status: 400,
        errors: error.details.map((err) => ({
          field: err.path[0],
          message: err.message,
        })),
      });
    }

    const imagePaths = req.files.map((file) => file.path);
    value.images = imagePaths;

    const newProduct = await Product.create(value);

    res.status(201).json({
      status: 201,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      status: 200,
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
