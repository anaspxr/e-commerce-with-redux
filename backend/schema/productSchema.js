import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    image: { type: String, required: true },
    category: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
