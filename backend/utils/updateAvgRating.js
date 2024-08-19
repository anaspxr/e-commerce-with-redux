import Review from "../schema/reviewSchema.js";
import Product from "../schema/productSchema.js";

async function updateAvgRating(productId) {
  const reviews = await Review.aggregate([
    { $match: { product: productId } },
    { $group: { _id: "$product", averageRating: { $avg: "$rating" } } },
  ]);

  const averageRating = reviews.length > 0 ? reviews[0].averageRating : 0;

  await Product.findByIdAndUpdate(productId, { averageRating });
}

export default updateAvgRating;
