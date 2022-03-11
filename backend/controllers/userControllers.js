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

    let ganderLocal;
    if (body.gander) {
      ganderLocal = body.gander.toLowerCase();
    }

    const newUser = new UserModel({
      ...body,
      password: hashedPassword,
      gander: ganderLocal,
    });

    const { name, email, gander } = await newUser.save();

    res.json({
      status: "success",
      message: "user added successfully",
      doc: { name, email, gander },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "fall",
      message: error.message,
    });
  }
};
