import Order from "../../schema/orderSchema.js";
import CustomError from "../../utils/CustomError.js";

const getAllOrders = async (req, res) => {
  const orders = await Order.find();
  res.status(200).json(orders);
};

const getAllOrdersOfUser = async (req, res, next) => {
  const orders = await Order.find({ userID: req.params.id });
  if (!orders || orders.length === 0) return next(new CustomError("No orders found", 404));
  res.status(200).json(orders);
};

const getOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) return next(new CustomError("Order not found", 404));
  res.status(200).json(order);
};

const updateOrder = async (req, res, next) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.orderID,
    {
      $set: req.body,
    },
    { new: true }
  );
  if (!updatedOrder) return next(new CustomError("Order not found", 404));
  res.status(200).json(updatedOrder);
};

const deleteOrder = async (req, res, next) => {
  const deleted = await Order.findByIdAndDelete(req.params.orderID);
  if (!deleted) return next(new CustomError("Order not found", 404));
  res.status(200).json("Order has been deleted");
};
export { getAllOrders, getAllOrdersOfUser, getOrder, updateOrder, deleteOrder };
