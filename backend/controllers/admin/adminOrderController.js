import Order from "../../schema/ordersSchema.js";
import CustomError from "../../utils/CustomError.js";
import tryCatch from "../../utils/trycatch.js";

const getAllOrders = tryCatch(async (req, res) => {
  const orders = await Order.find();
  res.status(200).json(orders);
});

const getAllOrdersOfUser = tryCatch(async (req, res, next) => {
  const orders = await Order.find({ userID: req.params.id });
  if (!orders || orders.length === 0)
    next(new CustomError("No orders found", 404));
  res.status(200).json(orders);
});

const getOrder = tryCatch(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) next(new CustomError("Order not found", 404));
  res.status(200).json(order);
});

const updateOrder = tryCatch(async (req, res, next) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.orderID,
    {
      $set: req.body,
    },
    { new: true }
  );
  if (!updatedOrder) next(new CustomError("Order not found", 404));
  res.status(200).json(updatedOrder);
});

const deleteOrder = tryCatch(async (req, res, next) => {
  const deleted = await Order.findByIdAndDelete(req.params.orderID);
  if (!deleted) next(new CustomError("Order not found", 404));
  res.status(200).json("Order has been deleted");
});

export { getAllOrders, getAllOrdersOfUser, getOrder, updateOrder, deleteOrder };
