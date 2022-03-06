import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";
const saltRounds = 10;

export const createUser = async (req, res) => {
  try {
    const { password, ...body } = req.body;

    const hashedPassword = await bcrypt.hash(
      password,
      saltRounds
    );
    // console.log({ password, body, hashedPassword });

    let gander;
    if (body.gander) {
      gander = body.gander.toLowerCase();
    }

    const newUser = new UserModel({
      ...body,
      password: hashedPassword,
      gander,
    });

    const doc = await newUser.save();

    res.json({
      status: "success",
      message: "user added successfully",
      doc,
    });
  } catch (error) {
    res.status(500).json({
      status: "fall",
      message: error.message,
    });
  }
};
