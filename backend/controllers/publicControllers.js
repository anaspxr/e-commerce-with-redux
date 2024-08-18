import Product from "../schema/productSchema.js";
import CustomError from "../utils/CustomError.js";

const getProducts = async (req, res) => {
  const queryNew = req.query.new;
  const queryCategory = req.query.category;
  let products;
  if (queryNew) {
    if (queryCategory)
      // if both new and category query parameters are provided
      products = await Product.find({ category: { $in: [queryCategory] } })
        .sort({ createdAt: -1 })
        .limit(5);
    else products = await Product.find().sort({ createdAt: -1 }).limit(5); // if only new query parameter is provided
  } else if (queryCategory) {
    // if only category query parameter is provided
    products = await Product.find({ category: { $in: [queryCategory] } });
  } else {
    // if no query parameters are provided return all products
    products = await Product.find();
  }
  res.status(200).json(products);
};

const getProductById = async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) return next(new CustomError("Product not found", 404));
  res.status(200).json({ product });
};

export { getProducts, getProductById };
