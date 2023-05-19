import dbConnect from "../../../utils/mongo";
import PizzaModel from "../../../models/Pizza";

export default async function handler(req, res) {
  await dbConnect();
  const { method, query } = req;
  if (method === "GET") {
    const data = await PizzaModel.find({ _id: query.id });
    return res.status(200).json({ data });
  } else if (method === "DELETE") {
    try {
      await PizzaModel.findByIdAndDelete({ _id: query.id });
      res.status(200).json({ message: "Item was Deleted Successfully" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  } else if (method === "PUT") {
    try {
      const body=req.body;
      console.log(body);
      let p=await PizzaModel.updateOne(query._id,{$set:{...body}});
      console.log(p);
      res.status(200).json({ message: "Item was Updated Successfully",pizza:p});
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
}
