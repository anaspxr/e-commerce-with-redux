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
import tryCatch from "../utils/tryCatch.js";
import {
  getCount,
  getMonthlyRevenue,
  getMonthlyUsers,
  getMostSold,
  getTotalRevenue,
  getYearlyRevenue,
} from "../controllers/admin/adminStatsController.js";

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
router.get("/orders/userID/:id", verifyTokenAndAdmin, tryCatch(getAllOrdersOfUser)); //get a user's all orders
router.get("/orders/:orderID", verifyTokenAndAdmin, tryCatch(getOrder)); // get single order using orderID
router.patch("/orders/:orderID", verifyTokenAndAdmin, tryCatch(updateOrder)); //update one order using orderID
router.delete("/orders/:orderID", verifyTokenAndAdmin, tryCatch(deleteOrder)); // delete order using orderID

router.get("/wishlists", verifyTokenAndAdmin, tryCatch(getAllWishlists)); // get wishlists of all users
router.get("/wishlists/:id", verifyTokenAndAdmin, tryCatch(getUserWishlist)); // get wishlists of all users

//stats
router.get("/stats/count", verifyTokenAndAdmin, tryCatch(getCount)); // get count of users/products/orders
router.get(
  "/stats/monthlyusers",
  verifyTokenAndAdmin,
  tryCatch(getMonthlyUsers)
); // get monthly registered users stats
router.get(
  "/stats/monthlyrevenue",
  verifyTokenAndAdmin,
  tryCatch(getMonthlyRevenue)
); // get total revenue in each month of a year
router.get(
  "/stats/yearlyrevenue",
  verifyTokenAndAdmin,
  tryCatch(getYearlyRevenue)
); // get total revenue of a year
router.get(
  "/stats/totalrevenue",
  verifyTokenAndAdmin,
  tryCatch(getTotalRevenue)
); // get total revenue of all time
router.get("/stats/mostsold", verifyTokenAndAdmin, tryCatch(getMostSold)); // get 5 most sold products

export default router;
