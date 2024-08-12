import express from "express";
import { verifyTokenAndAdmin } from "../middlewares/verifyToken.js";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js";

const router = express.Router();

// url/api/products

//get all products   with query
router.get("/", getProducts);

// get one product
router.get("/:id", getProductById);

// create product
router.post("/", verifyTokenAndAdmin, createProduct);

// update product
router.put("/:id", verifyTokenAndAdmin, updateProduct);

// delete product
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

export default router;
