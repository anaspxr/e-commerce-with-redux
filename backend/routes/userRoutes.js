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
import { getCartOfUser, removeFromCart, updateCart } from "../controllers/user/cartController.js";
import tryCatch from "../utils/trycatch.js";
import { createReview, deleteReview, updateReview } from "../controllers/user/reviewController.js";

const router = express.Router();

router.get("/", verifyToken, tryCatch(getUser)); //get own details
router.patch("/", verifyToken, tryCatch(updateUser)); // update own details

router.get("/cart", verifyToken, tryCatch(getCartOfUser)); // get the cart of the user
router.post("/cart", verifyToken, tryCatch(updateCart)); // add or update items to cart
router.delete("/cart", verifyToken, tryCatch(removeFromCart)); // remove product from the cart

router.get("/orders", verifyToken, tryCatch(getAllOrdersOfUser)); //get user's orders
router.post("/orders", verifyToken, tryCatch(createOrder)); // create order
router.get("/orders/:orderID", verifyToken, tryCatch(getOrder)); //get single order
router.patch("/orders/cancel/:orderID", verifyToken, tryCatch(cancelOrder)); // cancel order

router.get("/wishlist", verifyToken, tryCatch(getUserWishlist)); //get wishlist of the user
router.post("/wishlist", verifyToken, tryCatch(addToWishlist)); // add product to wishlist
router.delete("/wishlist", verifyToken, tryCatch(removeFromWishlist)); // remove product from wishlist

router.post("/review/:productID", verifyToken, tryCatch(createReview)); // create a review for a product
router.patch("/review/:productID", verifyToken, tryCatch(updateReview)); // update a review for a product
router.delete("/review/:reviewID", verifyToken, tryCatch(deleteReview)); // delete a review for a product

export default router;
