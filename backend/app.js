import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import { UserController, ItemsController } from "./Controllers/index.js";
import { ErrorValidation } from "./utils/ErrorValidation.js";
import CheckAuth from "./utils/CheckAuth.js";

dotenv.config();
const app = express();
app.use(cors());
const port = process.env.PORT;
const DB_Connect = process.env.DATA_BASE_CONNECT;

mongoose
  .connect(`${DB_Connect}`)
  .then(() => {
    console.log("DB is working");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
//User
app.post("/signup", UserController.register);
app.post("/login", UserController.login);
app.get("/authMe", CheckAuth, UserController.auth);
app.post("/requestResetPassword", UserController.forgotPassword);
app.post("/tokenValidation", UserController.isTokenValid);
app.post("/resetPassword", UserController.resetPassword);
//ItemsLogic
app.get("/userSection", ItemsController.getShoes);
app.listen(port, (err) => {
  if (err) {
    console.log("Error starting server", err);
  }
  console.log("Server Working");
});
