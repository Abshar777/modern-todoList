import { config } from "dotenv";
import {connect} from "mongoose";
config()

export default async function connectDb(){
    const uri=process.env.MONGO_URI ?? ""
    await connect(uri)
   console.log("mongodb conneted successfully")
}