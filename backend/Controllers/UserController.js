import userModel from "../Modules/User.js";
import bcrypt from "bcrypt";
export const register = async (req, res) => {
  try {
    const reqPass = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(reqPass, salt);
    const doc = new userModel({
      email: req.body.email,
      password: hashPass,
      firstName: req.body.firstName,
      secondName: req.body.secondName,
    });
    const user = await doc.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Registration unavaible",
    });
  }
};
export const login = async (req, res) => {};
