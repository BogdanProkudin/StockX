import userModel from "../Modules/User.js";
import jwt from "jsonwebtoken";
export const purchasedProducts = async (req, res) => {
  try {
    const { token, productData } = req.body;
    if (!token || !productData) {
      return res
        .status(400)
        .json({ message: "User ID and purchase data are required." });
    }

    try {
      const verified = jwt.verify(token, process.env.JWT_PAS);
      const user = await userModel.findById(verified._id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.isPurchased.push({
        ...productData,
        addedAt: new Date(),
      });
      await user.save();
      return res
        .status(200)
        .json({ message: "Product purchased successfully" });
    } catch (err) {
      console.error("Error verifying jwt", err.message);
      return res.status(403).json({ message: "Invalid permissions" });
    }
  } catch (error) {
    console.error("Internal Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getPurchasedProducts = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }
    console.log("token for purchased items", token);

    try {
      const verified = jwt.verify(token, process.env.JWT_PAS);
      const user = await userModel.findById(verified._id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      console.log("bought items", user.isPurchased);

      res.status(200).json(user.isPurchased);
    } catch (error) {
      console.error("Error verifying jwt", err.message);
      return res.status(403).json({ message: "Invalid permissions" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const removeExpiredProducts = async () => {
  const users = await userModel.find();

  const now = new Date();
  for (const user of users) {
    user.isPurchased = user.isPurchased.filter((product) => {
      const addedAt = new Date(product.addedAt);
      const diffInDays = (now - addedAt) / (1000 * 60 * 60 * 24);
      return diffInDays <= 14;
    });

    await user.save();
  }
};

setInterval(removeExpiredProducts, 48 * 60 * 60 * 1000);
