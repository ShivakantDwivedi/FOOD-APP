import mongoose from "mongoose";

const orderHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orders: [
      {
        orderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Order",
          required: true,
        },
        orderDate: {
          type: Date,
          default: Date.now,
        },
        totalAmount: {
          type: Number,
          required: true,
        },
        status: {
          type: String,
          enum: ["Pending", "Accepted", "Delivered", "Cancelled"],
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export const OrderHistory = mongoose.model("OrderHistory", orderHistorySchema);
