import userModel from "../Modules/User.js";
import jwt from "jsonwebtoken";
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
    const token = jwt.sign(
      {
        _id: user._id,
      },
      JWT_PAS,
      {
        expiresIn: "30d",
      }
    );
    const { password, ...userData } = user._doc;
    res.status(200).json(token, ...userData);
  } catch (error) {
    res.status(500).json({
      message: "Registration unavaible",
    });
  }
};
export const login = async (req, res) => {
  try {
  } catch (error) {}
};
