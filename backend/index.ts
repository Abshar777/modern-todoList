import express from "express";
import connectDb from "./config/db";
import UserRouter from "./router/userRouter";
import { config } from "dotenv";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
// config()
connectDb()

const app=express();
const port = process.env.PORT || 5000

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/api/users',UserRouter)
app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})