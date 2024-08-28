import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      flatName: String,
      pincode: Number,
      city: String,
      state: String,
      phone: String,
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    wishList: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WishList",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
