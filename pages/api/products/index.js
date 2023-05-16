import dbConnect from "../../../utils/mongo";
import PizzaModel from '../../../models/Pizza';

export default async function handler(req,res){
    let conn=await dbConnect();
    const {method,params}=req;
    
    if(method==="GET" && params===undefined){
        const data=await PizzaModel.find(); 
        res.status(200).json({data})
    }
    else if(method==="GET" && params.id){
        const data=await PizzaModel.find({_id:params.id});
        res.status(200).json({data});
    }
}