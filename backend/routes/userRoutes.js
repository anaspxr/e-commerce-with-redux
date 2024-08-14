import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  getUser,
  updateUser,
} from "../controllers/userControllers/userController.js";
import {
  addToWishlist,
  getUserWishlist,
  removeFromWishlist,
} from "../controllers/userControllers/wishListController.js";
import {
  cancelOrder,
  createOrder,
  getAllOrdersOfUser,
  getOrderOfUserById,
} from "../controllers/userControllers/orderController.js";
import {
  getCartOfUser,
  removeFromCart,
  updateCart,
} from "../controllers/userControllers/cartController.js";

const router = express.Router();

router.get("/", verifyToken, getUser); //get own details
router.patch("/", verifyToken, updateUser); // update own details

router.get("/cart", verifyToken, getCartOfUser); // get the cart of the user
router.post("/cart", verifyToken, updateCart); // add or update items to cart
router.delete("/cart", verifyToken, removeFromCart); // remove product from the cart

router.get("/orders", verifyToken, getAllOrdersOfUser); //get user's orders
router.post("/orders", verifyToken, createOrder); // create order
router.get("/orders/:orderID", verifyToken, getOrderOfUserById); //get single order
router.patch("/orders/cancel/:orderID", verifyToken, cancelOrder); // cancel order

router.get("/wishlist", verifyToken, getUserWishlist); //get wishlist of the user
router.post("/wishlist", verifyToken, addToWishlist); // add product to wishlist
router.delete("/wishlist", verifyToken, removeFromWishlist); // remove product from wishlist

export default router;
