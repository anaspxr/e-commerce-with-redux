import express from "express";
import {
  getProducts,
  getProductById,
} from "../controllers/publicControllers.js";

const router = express.Router();

router.get("/products", getProducts); //get all products,with or without query
router.get("/products/:id", getProductById); // get one product

export default router;
