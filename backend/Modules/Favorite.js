import mongoose from "mongoose";

const ListSchema = new mongoose.Schema({
  titleList: { type: String, required: true, unique: true },
  data: { type: Array, default: [] },
});

const FavoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    lists: {
      title: { type: String, default: "All Favorites" },
      data: {
        type: [ListSchema],
        default: [],
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Favorite", FavoriteSchema, "StockX");
