import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  shopName: {
    type: String,
    trim: true,
  },
  item: {
    type: String,
    trim: true,
  },
  amount: {
    type: Number,
    min: 0,
  },
  quantity: {
    type: Number,
    min: 1,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    enum: ["Food", "Beverage", "Dessert", "Snack", "Other"],
  },
  status: {
    type: String,
    enum: ["Pending", "Delivered", "Cancelled"],
    default: "Pending",
  },
  images: {
    type: Array,
  },
  tags: {
    type: [String],
    default: [],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  shopLocation: {
    type: String,
    trim: true,
  },
  ratings: {
    type: [Number],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

productSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
