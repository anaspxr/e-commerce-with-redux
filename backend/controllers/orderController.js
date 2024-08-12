import Order from "../schema/ordersSchema.js";

const getAllOrdersOfUser = async (req, res) => {
  try {
    const orders = await Order.find({ userID: req.params.id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getOrderOfUserById = async (req, res) => {
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
};

const createOrder = async (req, res) => {
  try {
    const newOrder = new Order({ ...req.body, userID: req.user.id });
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

const cancelOrder = async (req, res) => {
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
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateOrder = async (req, res) => {
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
};
const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.orderID);
    res.status(200).json("Order has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  getAllOrdersOfUser,
  getOrderOfUserById,
  createOrder,
  cancelOrder,
  updateOrder,
  getAllOrders,
  deleteOrder,
};