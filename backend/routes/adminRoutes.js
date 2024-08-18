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
import tryCatch from "../utils/trycatch.js";

const router = express.Router();

router.get("/users", verifyTokenAndAdmin, tryCatch(getAllUsers)); // get all users
router.get("/users/:id", verifyTokenAndAdmin, tryCatch(getUser)); //get individual user
router.patch("/users/:id", verifyTokenAndAdmin, tryCatch(updateUser)); //update one user
router.delete("/users/:id", verifyTokenAndAdmin, tryCatch(deleteUser)); //delete one user

router.post("/product", verifyTokenAndAdmin, tryCatch(createProduct)); // create product
router.put("/product/:id", verifyTokenAndAdmin, tryCatch(updateProduct)); // update product
router.delete("/product/:id", verifyTokenAndAdmin, tryCatch(deleteProduct)); // delete product

router.get("/carts", verifyTokenAndAdmin, tryCatch(getAllCarts)); // get carts of every users
router.get("/carts/:id", verifyTokenAndAdmin, tryCatch(getCartOfUser)); //get cart of one user

router.get("/orders", verifyTokenAndAdmin, tryCatch(getAllOrders)); //get all orders of every users
router.get("/orders/:id", verifyTokenAndAdmin, tryCatch(getAllOrdersOfUser)); //get a user's all orders
router.get("/orders/:orderID", verifyTokenAndAdmin, tryCatch(getOrder)); // get single order using orderID
router.patch("/orders/:orderID", verifyTokenAndAdmin, tryCatch(updateOrder)); //update one order using orderID
router.delete("/orders/:orderID", verifyTokenAndAdmin, tryCatch(deleteOrder)); // delete order using orderID

router.get("/wishlists", verifyTokenAndAdmin, tryCatch(getAllWishlists)); // get wishlists of all users
router.get("/wishlists/:id", verifyTokenAndAdmin, tryCatch(getUserWishlist)); // get wishlists of all users

export default router;
