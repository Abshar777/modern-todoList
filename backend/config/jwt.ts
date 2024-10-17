import { config } from "dotenv"
import jwt from "jsonwebtoken"
config()

export const generateToken=(userId:string)=>{
    const secret=process.env.JWT_SECRET || ""
    return jwt.sign({userId},secret,{
        expiresIn:"30d"
    })
}