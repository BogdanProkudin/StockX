import userModel from "../Modules/User.js";
import jwt from "jsonwebtoken";

export const getFavoriteList = async (req, res) => {
  try {
    const userId = req.userId;

    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(403).json({ message: "Invalid permissions" });
      }
      res.status(200).json(user.favoriteLists.default);
    } catch (err) {
      console.error("Error verifying jwt", err.message);
      return res.status(403).json({ message: "Invalid permissions" });
    }
  } catch (error) {
    console.error("Internal Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createFavoriteList = async (req, res) => {
  const { titleList } = req.body;
  console.log("name list", titleList);

  const userId = req.userId;
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(403).json({ message: "Invalid permissions" });
    }
    user.favoriteLists.default.data.push({
      titleList,
      data: [],
    });
    await user.save();
    return res.status(200).json(user.favoriteLists.default);
  } catch (error) {
    console.error("Internal Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addToFavoriteList = async (req, res) => {
  const { data } = req.body;
  const userId = req.userId;
  const user = await userModel.findById(userId);
  try {
    user.favoriteLists.default.data.push(data);
    await user.save();
    res.status(200).json({ message: "Product added to favorite list" });
  } catch (error) {
    console.error("Internal Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
