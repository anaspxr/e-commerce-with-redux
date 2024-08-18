import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getUser, updateUser } from "../controllers/user/userController.js";
import {
  addToWishlist,
  getUserWishlist,
  removeFromWishlist,
} from "../controllers/user/wishListController.js";
import {
  cancelOrder,
  createOrder,
  getAllOrdersOfUser,
  getOrder,
} from "../controllers/user/orderController.js";
import {
  getCartOfUser,
  removeFromCart,
  updateCart,
} from "../controllers/user/cartController.js";

const router = express.Router();

router.get("/", verifyToken, getUser); //get own details
router.patch("/", verifyToken, updateUser); // update own details

router.get("/cart", verifyToken, getCartOfUser); // get the cart of the user
router.post("/cart", verifyToken, updateCart); // add or update items to cart
router.delete("/cart", verifyToken, removeFromCart); // remove product from the cart

router.get("/orders", verifyToken, getAllOrdersOfUser); //get user's orders
router.post("/orders", verifyToken, createOrder); // create order
router.get("/orders/:orderID", verifyToken, getOrder); //get single order
router.patch("/orders/cancel/:orderID", verifyToken, cancelOrder); // cancel order

router.get("/wishlist", verifyToken, getUserWishlist); //get wishlist of the user
router.post("/wishlist", verifyToken, addToWishlist); // add product to wishlist
router.delete("/wishlist", verifyToken, removeFromWishlist); // remove product from wishlist

export default router;
