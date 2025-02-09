import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    firstName: {
      type: String,
    },
    secondName: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: String,
    },
    passwordResetAttempts: {
      type: Number,
    },
    newPasswordExpires: {
      type: String,
    },

    orderPurchased: {
      type: Array,
      default: [],
    },
    bidPurchased: {
      type: Array,
      default: [],
    },
    shoeSize: {
      type: String,
    },
    shippingAddresses: {
      type: Array,
      default: [],
    },
    billingAddresses: {
      type: Array,
      default: [],
    },
    billingMethods: {
      type: Array,
      default: [],
    },
    userName: {
      type: String,
    },
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

export default mongoose.model("User", UserSchema, "StockX");
