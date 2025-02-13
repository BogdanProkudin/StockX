import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema(
  {
    favoriteLists: {
      type: {
        default: {
          title: { type: String, default: "All Favourites" },
          data: [
            {
              titleList: { type: String, require: true },
              data: { type: Array, default: [] },
            },
          ],
        },
      },
      default: {
        title: "All Favorites",
        data: [],
      },
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("Favorite", FavoriteSchema, "StockX");
