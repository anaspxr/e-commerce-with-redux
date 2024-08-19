import Review from "../schema/reviewSchema.js";
import Product from "../schema/productSchema.js";

async function updateAvgRating(productID) {
  const reviews = await Review.aggregate([
    { $match: { productID: productID } },
    { $group: { _id: "$productID", averageRating: { $avg: "$rating" } } },
  ]);

  const averageRating = reviews.length > 0 ? reviews[0].averageRating : 0;

  await Product.findByIdAndUpdate(productID, { averageRating });
}

export default updateAvgRating;
