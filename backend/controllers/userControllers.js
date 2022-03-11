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

    let genderLocal;
    if (body.gender) {
      genderLocal = body.gender.toLowerCase();
    }

    const newUser = new UserModel({
      ...body,
      password: hashedPassword,
      gender: genderLocal,
    });

    const { name, email, gender } = await newUser.save();

    res.json({
      status: "success",
      message: "user added successfully",
      doc: { name, email, gender },
    });
  } catch (error) {
    console.log(error);

    if (error.message.includes("duplicate key error"))
      return res.status(401).json({
        status: "fall",
        message: "email is exist",
      });

    res.status(500).json({
      status: "fall",
      message: error.message,
    });
  }
};
