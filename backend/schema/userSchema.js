import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    productID: mongoose.Types.ObjectId,
    quantity: Number,
  },
  { timestamps: true }
);

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
      name: String,
      flatName: String,
      pincode: Number,
      city: String,
      state: String,
      phone: String,
    },
    cart: [cartSchema],
    orders: [mongoose.Types.ObjectId],
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
