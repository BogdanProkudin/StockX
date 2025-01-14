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
    userName: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema, "StockX");
