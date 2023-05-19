import dbConnect from "../../../utils/mongo";
import PizzaModel from "../../../models/Pizza";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    const data = await PizzaModel.find();
    res.status(200).json({ data });
  }

  if(method==="POST"){
    const body = req.body;
    try {
      let pizza=await PizzaModel.create(body);
      return res.status(200).json({ message: "Item Added Successfully",pizza:pizza });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }
}
