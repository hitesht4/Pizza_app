import dbConnect from "../../../utils/mongo";
import PizzaModel from "../../../models/Pizza";

export default async function handler(req, res) {
  await dbConnect();
  const { method, query } = req;
  if (method === "GET") {
    const data = await PizzaModel.find({ _id: query.id });
    res.status(200).json({ data });
  }
}
