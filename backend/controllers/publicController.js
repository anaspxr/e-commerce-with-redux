import Product from "../schema/productSchema.js";
import Review from "../schema/reviewSchema.js";
import CustomError from "../utils/CustomError.js";

const getProducts = async (req, res) => {
  //? gets products based on query parameters: new, category, page, limit

  const { new: queryNew, category: queryCategory, page, limit } = req.query;
  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;
  const skip = (pageNum - 1) * limitNum;

  let matchStage = {};

  if (queryCategory) {
    // if category query parameter is provided, include it in the match stage
    matchStage.category = { $in: [queryCategory] };
  }

  const aggregationPipeline = [{ $match: matchStage }]; // initial stage of aggregation pipeline

  if (queryNew) {
    // if new query parameter is provided, sort by createdAt field and limit to 5
    aggregationPipeline.push(
      { $sort: { createdAt: -1 } },
      { $limit: limitNum }
    );
  }

  if (page) {
    // if pagination is requested, push skip and limit stages to aggregation pipeline
    aggregationPipeline.push({ $skip: skip }, { $limit: limitNum });
  }

  // if no pagination is requested, fetch 100 products
  if (!page && !queryNew) {
    aggregationPipeline.push({ $limit: 100 });
  }

  const products = await Product.aggregate(aggregationPipeline);

  // calculate total documents for pagination metadata
  const total = await Product.countDocuments(matchStage);

  res.status(200).json({ products, page: pageNum, total });
};

const getPopular = async (req, res, next) => {
  const popularProducts = await Review.aggregate([
    {
      $group: {
        _id: "$productID",
        averageRating: { $avg: "$rating" },
      },
    },
    { $sort: { averageRating: -1 } },
    { $limit: 6 },
  ])
    .lookup({
      from: "products",
      localField: "_id",
      foreignField: "_id",
      as: "product",
    })
    .unwind("product")
    .project({
      _id: 0,
      product: 1,
    });

  if (!popularProducts) return next(new CustomError("No data found", 404));
  res.status(200).json(popularProducts);
};

const getRelatedProducts = async (req, res, next) => {
  try {
    const categories = req.query.categories?.split(",");

    const relatedProducts = await Product.find({
      category: { $in: categories }, // Matches any category in the product's category array
    }).limit(4); // Limits the number of results

    res.status(200).json(relatedProducts);
  } catch (error) {
    next(error); // Passes any error to the error-handling middleware
  }
};

const getProductById = async (req, res, next) => {
  const id = req.params.productID;
  const product = await Product.findById(id);
  if (!product) return next(new CustomError("Product not found", 404));
  res.status(200).json({ product });
};

const getReviewsOfProduct = async (req, res, next) => {
  const reviews = await Review.find({
    productID: req.params.productID,
  }).populate("userID", "name email");
  if (!reviews) return next(new CustomError("Reviews not found", 404));
  res.status(200).json(reviews);
};

export {
  getProducts,
  getProductById,
  getReviewsOfProduct,
  getPopular,
  getRelatedProducts,
};
