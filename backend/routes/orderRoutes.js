import {
  cancelOrder,
  deleteOrder,
  getAllOrders,
  getAllOrdersOfUser,
  getOrderOfUserById,
  updateOrder,
} from "../controllers/orderController.js";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthZ,
} from "../middlewares/verifyToken.js";
import express from "express";

const router = express.Router();

//get user's orders
router.get("/:id", verifyTokenAndAuthZ, getAllOrdersOfUser);

//get single order
router.get("/:id/:orderID", verifyTokenAndAuthZ, getOrderOfUserById);

// create order
router.post("/", verifyToken, cancelOrder);

// cancel order
router.patch("/cancel/:id", verifyTokenAndAuthZ, cancelOrder);

// admin only

//get all orders
router.get("/", verifyTokenAndAdmin, getAllOrders);

// update order
router.patch("/:orderID", verifyTokenAndAdmin, updateOrder);

// delete order
router.delete("/:orderID", verifyTokenAndAdmin, deleteOrder);

export default router;
