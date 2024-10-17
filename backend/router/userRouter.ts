import express from "express";
import {googleHandler, loginhandler,signUpHandler} from "../controller/userController"
const router=express.Router();

// login route
// req email,password
// res data as User , message,jwt in cookie

router.post('/login',loginhandler);

// signUp route
// req firstName,lastName,email,password
// res data as User , message,jwt in cookie
router.post('/register',signUpHandler);

// google login route
// req token
// res data as User , message,jwt in cookie
router.post('/google',googleHandler);



export default router;