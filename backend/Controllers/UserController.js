import userModel from "../Modules/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const register = async (req, res) => {
  try {
    // нужно ли добавлять  проверку на то занят ли ваш юзер нейм или нет когда фамилия и имя может повторяться
    const JWT_PAS = process.env.JWT_PAS;
    const reqPass = req.body.userData.password;
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(reqPass, salt);
    const doc = new userModel({
      email: req.body.userData.email,
      password: hashPass,
      firstName: req.body.userData.email,
      secondName: req.body.userData.email,
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

    res.status(200).json({ message: "User registered successfully", token }); //отправка на фронт только токена потом по этому токену будем находить юзера в бд/ или по юзер айди
  } catch (error) {
    console.log("ERROR REGISTRATION USER", error);

    res.status(500).json({
      message: "Registration unavaible",
    });
  }
};
export const login = async (req, res) => {
  try {
    const JWT_PAS = process.env.JWT_PAS;
    const user = await userModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(404).json({
        message: "Email or password is wrong",
      });
    }
    const reqPass = req.body.password;
    const userPass = await bcrypt.compare(reqPass, user._doc.password);
    if (!userPass) {
      return res.status(404).json({
        message: "Email or password is wrong",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      JWT_PAS,
      {
        expiresIn: "30d",
      }
    );

    res.status(200).json({ message: "User login successfully", token });
  } catch (error) {
    res.status(500).json({
      message: "Login unavaible",
    });
  }
};
export const auth = async (req, res) => {
  try {
    const user = userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "No access",
      });
    }
    const { password, ...userData } = user._doc;
    res.json({ ...userData });
  } catch (error) {
    return res.status(500).json({
      message: "No access",
    });
  }
};
