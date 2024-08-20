import Review from "../../schema/reviewSchema.js";
import Product from "../../schema/productSchema.js";
import CustomError from "../../utils/CustomError.js";

const createReview = async (req, res, next) => {
  const { rating, comment } = req.body;
  const existingReview = await Review.findOne({
    userID: req.user.id,
    productID: req.params.productID,
  });
  const existingProduct = await Product.findById(req.params.productID);
  if (!existingProduct) return next(new CustomError("Product not found", 404));
  if (existingReview) return next(new CustomError("Review already exists", 400));
  const review = new Review({
    productID: req.params.productID,
    userID: req.user.id,
    rating: Number(rating),
    comment,
  });
  const createdReview = await review.save();
  if (!createdReview) return next(new CustomError("Failed to save Review", 500));
  res.status(201).json(createdReview);
};

const updateReview = async (req, res, next) => {
  const { rating, comment } = req.body;
  const updatedReview = await Review.findOneAndUpdate(
    { userID: req.user.id, productID: req.params.productID },
    { rating: rating ? Number(rating) : undefined, comment }, //if the rating is not provided, it will not be updated
    { new: true }
  );
  if (!updatedReview) return next(new CustomError("Review not found", 404));
  res.status(200).json(updatedReview);
};

const deleteReview = async (req, res, next) => {
  const deletedReview = await Review.findOneAndDelete({
    _id: req.params.reviewID,
    userID: req.user.id,
  });
  if (!deletedReview) return next(new CustomError("Review not found", 404));
  res.status(200).json(deletedReview);
};

export { createReview, updateReview, deleteReview };
