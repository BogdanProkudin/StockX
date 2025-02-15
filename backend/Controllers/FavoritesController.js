import favoriteModel from "../Modules/Favorite.js";
import jwt from "jsonwebtoken";

export const getFavoriteList = async (req, res) => {
  try {
    const userId = req.userId;

    const favoriteList = await favoriteModel.findOne({ user: userId });
    if (!favoriteList) {
      return res.status(404).json({ message: "Favorite list not found" });
    }
    return res.status(200).json(favoriteList.lists);
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
    const favoriteList = await favoriteModel.findOne({ user: userId });
    if (!favoriteList) {
      return res.status(403).json({ message: "Invalid permissions" });
    }
    const newList = {
      titleList,
      data: [],
    };
    favoriteList.lists.data.push(newList);
    await favoriteList.save();
    return res.status(200).json(favoriteList.lists);
  } catch (error) {
    console.error("Internal Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addProductToList = async (req, res) => {
  const { titleList, productData } = req.body;
  console.log("name list", titleList);
  console.log("productData:", productData);

  const userId = req.userId;
  try {
    const updateFavoriteList = await favoriteModel.findOneAndUpdate(
      {
        user: userId,
        "lists.data.titleList": { $in: titleList },
      },
      {
        $push: {
          "lists.data.$[].data": productData,
          "lists.$[All Favorites].data": productData,
        },
      },
      {
        new: true,
      }
    );
    if (!updateFavoriteList) {
      return res.status(404).json({ message: "Invalid lists" });
    }
    console.log("updateFavoriteList:", updateFavoriteList.lists.data);

    return res.status(200).json({ message: "Product added to list" });
  } catch (error) {
    console.error("Internal Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
