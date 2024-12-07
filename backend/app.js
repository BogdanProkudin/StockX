import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import {
  UserController,
  ShoesController,
  FiltrationController,
} from "./Controllers/index.js";
import { ErrorValidation } from "./utils/ErrorValidation.js";
import CheckAuth from "./utils/CheckAuth.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(cors());
const port = process.env.PORT;
const DB_Connect = process.env.DATA_BASE_CONNECT;
console.log(DB_Connect);

mongoose
  .connect(`${DB_Connect}`)
  .then(() => {
    console.log("DB is working");
  })
  .catch((err) => {
    console.log("DB ERROR", err);
  });

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//User
app.post("/signup", UserController.register);
app.post("/login", UserController.login);
app.get("/authMe", CheckAuth, UserController.auth);
app.post("/requestResetPassword", UserController.forgotPassword);
app.post("/tokenValidation", UserController.isTokenValid);
app.post("/resetPassword", UserController.resetPassword);
//ItemsLogic
app.get("/getUserSection", ShoesController.getUserSection);
app.get("/getCollectionSection/:section", ShoesController.getCollectionSection);
app.get("/getInstagramSection", ShoesController.getInstagramSection);
app.get("/getImageSection/:section", ShoesController.getImageSection);
app.get("/getCardSection/:section", ShoesController.getCardSection);
app.get("/getSliderInfo/:section", ShoesController.getSliderInfo);
//FiltrationLogic
app.get("/searchProducts/:searchQuery", FiltrationController.searchProducts);

app.get(
  "/loadMoreItems/:sectionName/:page",
  FiltrationController.loadMoreItems
);
app.listen(port, (err) => {
  if (err) {
    console.log("Error starting server", err);
  }
  console.log("Server Working");
});
