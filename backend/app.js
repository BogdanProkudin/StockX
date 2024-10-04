import express from "express";
import mongoose from "mongoose";
// import cors from "cors"; по сути он не нужен так что если хочешь можешь его от сюда просто убрать
import dotenv from "dotenv";

import { registerValidation } from "./Validation/UserValidation.js";
import { UserController } from "./Controllers/index.js";
import { ErrorValidation } from "./utils/ErrorValidation.js";

dotenv.config();
const app = express();
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

app.post(
  "/Singup",
  registerValidation,
  ErrorValidation,
  UserController.register
);
app.post("/login", registerValidation, ErrorValidation, UserController.login);
app.listen(port, (err) => {
  if (err) {
    console.log("Error", err);
  }
  console.log("Server Working");
});
