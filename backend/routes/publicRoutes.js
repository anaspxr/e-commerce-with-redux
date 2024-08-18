import express from "express";
import {
  getProducts,
  getProductById,
} from "../controllers/publicControllers.js";
import tryCatch from "../utils/trycatch.js";

const router = express.Router();

router.get("/products", tryCatch(getProducts)); //get all products,with or without query
router.get("/products/:id", tryCatch(getProductById)); // get one product

export default router;
