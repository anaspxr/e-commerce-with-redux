import mongoose, { Schema } from "mongoose";
import updateAvgRating from "../utils/updateAvgRating.js";

const reviewSchema = new Schema(
  {
    productID: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
);

// Middleware to update the average rating after saving a review
reviewSchema.post("save", function (doc) {
  updateAvgRating(doc.productID);
});

// Middleware to update the average rating after updating a review
reviewSchema.post("findOneAndUpdate", function (doc) {
  if (doc) {
    updateAvgRating(doc.productID);
  }
});

// Middleware to update the average rating after deleting a review
reviewSchema.post("findOneAndDelete", function (doc) {
  if (doc) {
    updateAvgRating(doc.productID);
  }
});

export default mongoose.model("Review", reviewSchema);
