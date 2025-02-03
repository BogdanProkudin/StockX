import userModel from "../Modules/User.js";
import jwt from "jsonwebtoken";

export const getFavoriteList = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: "Permissions are required." });
    }

    try {
      const verified = jwt.verify(token, process.env.JWT_PAS);
      const user = await userModel.findById(verified._id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
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
