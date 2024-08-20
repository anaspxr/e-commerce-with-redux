import express from "express";
import {
  getProducts,
  getProductById,
  getReviewsOfProduct,
} from "../controllers/publicController.js";
import tryCatch from "../utils/trycatch.js";

const router = express.Router();

router.get("/products", tryCatch(getProducts)); //get all products,with or without query
router.get("/products/:productID", tryCatch(getProductById)); // get one product
router.get("/products/reviews/:productID", tryCatch(getReviewsOfProduct)); // get every reviews of the product

export default router;
