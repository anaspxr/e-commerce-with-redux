import Cart from "../../schema/cartSchema.js";

const getAllCarts = async (req, res) => {
  try {
    const data = await Cart.find();
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getCartOfUser = async (req, res) => {
  try {
    const data = await Cart.findOne({ userID: req.params.id }).populate({
      path: "products.productID",
      select: "name price image", // fields to get from populate
    });

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "No cart found for this user" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export { getAllCarts, getCartOfUser };
