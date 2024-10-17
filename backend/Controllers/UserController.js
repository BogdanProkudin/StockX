import userModel from "../Modules/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import nodemailer from "nodemailer";

export const register = async (req, res) => {
  try {
    const isUserExist = await userModel.findOne({
      email: req.body.email,
    });
    if (isUserExist) {
      return res.status(404).json("Email is taken");
    }
    // нужно ли добавлять  проверку на то занят ли ваш юзер нейм или нет когда фамилия и имя может повторяться
    const JWT_PAS = process.env.JWT_PAS;
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
    const { password, ...userData } = user._doc;
    res.status(200).json({ message: "User login successfully", token });
  } catch (error) {
    res.status(500).json({
      message: "Login unavaible",
    });
  }
};
export const auth = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
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

// POST /forgot-password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Поиск пользователя по email
  const user = await userModel.findOne({ email });

  if (!user) return res.status(404).send("Email not found");
  if (user.passwordResetAttempts > 3) {
    return res
      .status(404)
      .send(
        "You have exceeded your password reset request limit. Try again in 24 hours."
      );
  }
  // Генерация токена (действителен 1 час)
  const resetToken = await jwt.sign({ id: user._id }, "secretreset", {
    expiresIn: "1h",
  });

  await userModel.findOneAndUpdate(
    { email: email },
    { $inc: { passwordResetAttempts: 1 } }
  );

  await userModel.findOneAndUpdate(
    { email: email },
    { resetPasswordToken: resetToken }
  );
  await userModel.findOneAndUpdate(
    { email: email },
    { resetPasswordExpires: Date.now() + 3600000 }
  );
  // Сохранение токена и времени его создания в БД

  await user.save();

  // Настройка SMTP для отправки email
  const transporter = nodemailer.createTransport({
    service: "gmail", // Можно использовать другой SMTP-сервер
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "prokudinbogdan@gmail.com",
      pass: "hpsb iccf fqgi oisr",
    },
  });

  // Содержание email
  const mailOptions = {
    to: user.email,
    from: "passwordreset@example.com",
    subject: "Password Reset",
    html: `
   <html>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
      <table align="center" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #cccccc; border-collapse: collapse;">
        <tr>
          <td align="center" bgcolor="#70bbd9" style="padding: 40px 0 30px 0;">
            <h1 style="color: white;">Reset Your Password</h1>
          </td>
        </tr>
        <tr>
          <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
            <p style="font-size: 18px;">Hello,</p>
            <p style="font-size: 16px; line-height: 1.6;">You requested to reset your password. Click the link below to set a new password:</p>
            <a href="http://localhost:5173/resetPassword/${resetToken}" style="display: inline-block; padding: 10px 20px; color: white; background-color: #70bbd9; text-decoration: none; border-radius: 5px;">Reset Password</a>
            <p style="margin-top: 20px; font-size: 16px;">If you didn't request this, please ignore this email.</p>
          </td>
        </tr>
        <tr>
          <td bgcolor="#70bbd9" style="padding: 20px 30px; text-align: center;">
            <p style="color: white;">&copy; 2024 Your Company, All Rights Reserved.</p>
          </td>
        </tr>
      </table>
    </body>
  </html>
    `,
  };

  // Отправка письма
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.log("error", err);

      return res.status(500).send("Error sending email");
    }
    res.status(200).send("Password reset email sent");
  });
};

export const isTokenValid = async (req, res) => {
  const { resetPasswordToken } = req.body;

  // Декодируем токен
  const decodedUrlToken = decodeURIComponent(resetPasswordToken);

  try {
    // Проверяем токен
    const verifiedToken = jwt.verify(decodedUrlToken, "secretreset");
    console.log("Verified Token:", verifiedToken);

    const user = await userModel.findById(verifiedToken.id);
    if (!user) return res.status(404).send("User not found");

    const currentTime = Date.now();

    if (currentTime < user.resetPasswordExpires) {
      console.log("Токен действителен");
      return res.status(200).send("Token is valid");
    } else {
      console.log("Срок действия токена истек");
      return res.status(400).send("Token has expired");
    }
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).send("Invalid token");
  }
};
export const resetPassword = () => {};
