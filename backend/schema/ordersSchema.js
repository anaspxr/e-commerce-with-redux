import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Types.ObjectId, required: true },
    products: [
      {
        productID: { type: mongoose.Types.ObjectId, required: true },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    purchaseDate: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
    info: String,
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
