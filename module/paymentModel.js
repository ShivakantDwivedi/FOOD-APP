import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true, // Total amount paid
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "Online"],
      required: true, // Payment method used
    },
    transactionId: {
      type: String,
      default: null, // Unique transaction ID (for online payments)
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed", "Refunded"],
      default: "Pending", // Payment status
    },
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
