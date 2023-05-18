import dbConnect from "../../../utils/mongo";
import orderModel from "../../../models/Order";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    try {
      const orders = await orderModel.find({ customer: req.headers.user });
      res.status(200).json({ orders: orders });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }
  if (method === "POST") {
    const body = req.body;
    try {
      await orderModel.create(body);
      return res.status(200).json({ message: "Order Created Successfully" });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }
}
