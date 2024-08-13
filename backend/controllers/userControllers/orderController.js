import Order from "../../schema/ordersSchema.js";

const getAllOrdersOfUser = async (req, res) => {
  try {
    const orders = await Order.find({ userID: req.user.id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getOrderOfUserById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderID,
      userID: req.user.id,
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
      { _id: req.body.orderID, userID: req.user.id },
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

export { getAllOrdersOfUser, getOrderOfUserById, createOrder, cancelOrder };
