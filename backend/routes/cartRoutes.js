import express from "express";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthZ,
} from "../middlewares/verifyToken.js";
import {
  getAllCarts,
  getCartOfUser,
  removeFromCart,
  updateCart,
} from "../controllers/cartController.js";

const router = express.Router();

// get cart of individual users
router.get("/:id", verifyTokenAndAuthZ, getCartOfUser);

// add or update items to cart
router.post("/update", verifyToken, updateCart);

router.delete("/remove", verifyToken, removeFromCart);

//admin
// get all cart
router.get("/", verifyTokenAndAdmin, getAllCarts);

export default router;
