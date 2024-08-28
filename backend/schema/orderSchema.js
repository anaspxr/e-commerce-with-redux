import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        productID: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    sessionID: { type: String },
    purchaseDate: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    paymentStatus: { type: String, default: "pending" },
    shippingStatus: { type: String, default: "pending" },
    info: String,
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
