import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthZ,
} from "../middlewares/verifyToken.js";
import Order from "../schema/ordersSchema.js";
import express from "express";

const router = express.Router();

//get user's orders
router.get("/:id", verifyTokenAndAuthZ, async (req, res) => {
  try {
    const orders = await Order.find({ userID: req.params.id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get single order
router.get("/:id/:orderID", verifyTokenAndAuthZ, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderID,
      userID: req.params.id,
    });
    if (!order) return res.status(404).json({ message: "order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create order
router.post("/", verifyToken, async (req, res) => {
  try {
    const newOrder = new Order({ ...req.body, userID: req.user.id });
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

// cancel order
router.patch("/cancel/:id", verifyTokenAndAuthZ, async (req, res) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: req.body.orderID, userID: req.params.id },
      {
        $set: { status: "cancelled", info: req.body.info || "" },
      },
      { new: true }
    );
    if (!updatedOrder)
      return res.status(404).json({ message: "order not found" });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

// admin only

//get all orders
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update order
router.patch("/:orderID", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderID,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete order
router.delete("/:orderID", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.orderID);
    res.status(200).json("Order has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
