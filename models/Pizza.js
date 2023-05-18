import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 60,
    },
    desc: {
      type: String,
      required: true,
      maxLength: 500,
    },
    img: {
      type: String,
      required: true,
    },
    prices: {
      type: [Number],
      required: true,
    },
    extraOptions: {
      type: [
        {
          text: { type: String, required: true },
          price: { type: String, required: true },
        },
      ],
    },
  },
  { timeStamps: true }
);

export default mongoose.models.pizza || mongoose.model("pizza", pizzaSchema);
