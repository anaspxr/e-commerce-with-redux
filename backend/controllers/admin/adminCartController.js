import Cart from "../../schema/cartSchema.js";
import CustomError from "../../utils/CustomError.js";

const getAllCarts = async (req, res, next) => {
  const data = await Cart.find();
  if (data) {
    res.status(200).json(data);
  } else {
    next(new CustomError("No cart found", 404));
  }
};

const getCartOfUser = async (req, res, next) => {
  const data = await Cart.findOne({ userID: req.params.id }).populate({
    path: "products.productID",
    select: "name price image", // fields to get from populate
  });

  if (data) {
    res.status(200).json(data);
  } else {
    next(new CustomError("No cart found", 404));
  }
};

export { getAllCarts, getCartOfUser };
