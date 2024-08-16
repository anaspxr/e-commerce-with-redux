import express from "express";
import { verifyTokenAndAdmin } from "../middlewares/verifyToken.js";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/admin/adminUserController.js";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/admin/adminProductController.js";
import {
  getAllCarts,
  getCartOfUser,
} from "../controllers/admin/adminCartController.js";
import {
  deleteOrder,
  getAllOrders,
  getAllOrdersOfUser,
  getOrder,
  updateOrder,
} from "../controllers/admin/adminOrderController.js";
import {
  getAllWishlists,
  getUserWishlist,
} from "../controllers/admin/adminWishlistController.js";

const router = express.Router();

router.get("/users", verifyTokenAndAdmin, getAllUsers); // get all users
router.get("/users/:id", verifyTokenAndAdmin, getUser); //get individual user
router.patch("/users/:id", verifyTokenAndAdmin, updateUser); //update one user
router.delete("/users/:id", verifyTokenAndAdmin, deleteUser); //delete one user

router.post("/product", verifyTokenAndAdmin, createProduct); // create product
router.put("/product/:id", verifyTokenAndAdmin, updateProduct); // update product
router.delete("/product/:id", verifyTokenAndAdmin, deleteProduct); // delete product

router.get("/carts", verifyTokenAndAdmin, getAllCarts); // get carts of every users
router.get("/carts/:id", verifyTokenAndAdmin, getCartOfUser); //get cart of one user

router.get("/orders", verifyTokenAndAdmin, getAllOrders); //get all orders of every users
router.get("/orders/:id", verifyTokenAndAdmin, getAllOrdersOfUser); //get a user's all orders
router.get("/orders/:orderID", verifyTokenAndAdmin, getOrder); // get single order using orderID
router.patch("/orders/:orderID", verifyTokenAndAdmin, updateOrder); //update one order using orderID
router.delete("/orders/:orderID", verifyTokenAndAdmin, deleteOrder); // delete order using orderID

router.get("/wishlists", verifyTokenAndAdmin, getAllWishlists); // get wishlists of all users
router.get("/wishlists/:id", verifyTokenAndAdmin, getUserWishlist); // get wishlists of all users

export default router;
