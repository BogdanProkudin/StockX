import userModel from "../Modules/User.js";

export const purchasedProducts = async (req, res) => {
  const { token, product } = req.body;
  if (!token || !product) {
    return res
      .status(400)
      .json({ message: "User ID and purchase data are required." });
  }
  console.log("TOken:", token, "Product:", product);
};
