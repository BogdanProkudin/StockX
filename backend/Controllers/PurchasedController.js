import userModel from "../Modules/User.js";

export const purchasedProducts = async (req, res) => {
  const { token, productData } = req.body;
  if (!token || !productData) {
    return res
      .status(400)
      .json({ message: "User ID and purchase data are required." });
  }
  console.log("TOken:", token, "Product:", productData);
};
