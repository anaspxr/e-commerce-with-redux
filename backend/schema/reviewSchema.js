import mongoose, { Schema } from "mongoose";
import updateAvgRating from "../utils/updateAvgRating";

const reviewSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
);

// Middleware to update the average rating after saving a review
reviewSchema.post("save", function () {
  updateAvgRating(this.product);
});

// Middleware to update the average rating after updating a review
reviewSchema.post("findOneAndUpdate", function (doc) {
  if (doc) {
    updateAvgRating(doc.product);
  }
});

// Middleware to update the average rating after deleting a review
reviewSchema.post("findOneAndDelete", function (doc) {
  if (doc) {
    updateAvgRating(doc.product);
  }
});

export default mongoose.model("Review", reviewSchema);
