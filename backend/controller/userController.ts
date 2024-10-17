import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import UserModal from "../model/userSchema";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwt";
import admin from "../config/firebase";
import generateRandomKey from "../util/genrateRandomKey";

export const loginhandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await UserModal.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("user not found");
    }
    const passMatch = bcrypt.compareSync(password, user.password);
    if (!passMatch) {
      res.status(400);
      throw new Error("invalid password");
    }
    const token = generateToken((user?._id as string) || "");
    res.cookie("jwt", token, {
      path: "/",
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ data: user, message: "login successfully" });
  }
);

export const signUpHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password,img="" } = req.body;
    const userExist = await UserModal.findOne({ email });
    if (userExist) {
      res.status(400);
      throw new Error("user alredy exist");
    }
    const user = await UserModal.create({
      name,
      email,
      password,
      img
    });
    const token = generateToken((user?._id as string) || "");
    res.cookie("jwt", token, {
      path: "/",
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "successfully registerd", data: user });
  }
);

export const googleHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { token } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, name, picture } = decodedToken;
    let user = await UserModal.findOne({ email });
    if (!user) {
      user = new UserModal({
        name,
        email,
        password: generateRandomKey(8), 
        img: picture,
      });

      await user.save();
    }

    
    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        img: user.img,
      },
    });
  } 
);



