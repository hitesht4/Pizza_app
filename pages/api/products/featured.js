
import dbConnect from "../../../utils/mongo";
import PizzaModel from "../../../models/Pizza";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    const data = await PizzaModel.find().limit(4);
    res.status(200).json({ data });
  }
}
