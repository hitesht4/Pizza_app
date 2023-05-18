import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      maxLength: 60,
    },
    total: {
      type: Number,
      required: true,
    },
    payementMethods: {
      type: String,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  { timeStamps: true }
);

export default mongoose.models.order || mongoose.model("order", orderSchema);
