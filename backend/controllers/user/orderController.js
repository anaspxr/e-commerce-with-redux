import Order from "../../schema/orderSchema.js";
import CustomError from "../../utils/CustomError.js";

const getAllOrdersOfUser = async (req, res, next) => {
  const orders = await Order.find({ userID: req.user.id });
  if (!orders || orders.length === 0) return next(new CustomError("No orders found", 404));
  res.status(200).json(orders);
};

const getOrder = async (req, res, next) => {
  const order = await Order.findOne({
    _id: req.params.orderID,
    userID: req.user.id,
  });
  if (!order) return next(new CustomError("Order not found", 404));
  res.status(200).json(order);
};

const createOrder = async (req, res) => {
  const newOrder = new Order({ ...req.body, userID: req.user.id });
  const savedOrder = await newOrder.save();
  res.status(200).json(savedOrder);
};

const cancelOrder = async (req, res, next) => {
  const updatedOrder = await Order.findOneAndUpdate(
    { _id: req.params.orderID, userID: req.user.id },
    {
      $set: { status: "cancelled", info: req.body.info || "" },
    },
    { new: true }
  );
  if (!updatedOrder) return next(new CustomError("Order not found", 404));
  res.status(200).json(updatedOrder);
};

export { getAllOrdersOfUser, getOrder, createOrder, cancelOrder };
