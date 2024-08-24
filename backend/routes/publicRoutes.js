import express from "express";
import {
  getProducts,
  getProductById,
  getReviewsOfProduct,
  getPopular,
  getRelatedProducts,
} from "../controllers/publicController.js";
import tryCatch from "../utils/trycatch.js";

const router = express.Router();

router.get("/products", tryCatch(getProducts)); //get all products,with or without query
router.get("/products/popular", tryCatch(getPopular)); // get popular products based on reviews
router.get("/products/:productID", tryCatch(getProductById)); // get one product
router.get("/products/reviews/:productID", tryCatch(getReviewsOfProduct)); // get every reviews of the product
router.get("/products/related", tryCatch(getRelatedProducts)); // get related products based on category

export default router;
