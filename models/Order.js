import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      maxLength: 60,
    },
    address: {
      type: String,
      required: true,
      maxLength: 200,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    payementMethods: {
      type: Number,
      required: true
    },
  },
  { timeStamps: true }
);

export const orderModel = mongoose.model("order", orderSchema);
