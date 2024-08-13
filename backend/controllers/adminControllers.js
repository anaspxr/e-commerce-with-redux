import User from "../schema/userSchema.js";
import Product from "../schema/productSchema.js";
import Cart from "../schema/cartSchema.js";
import Order from "../schema/ordersSchema.js";
import WishList from "../schema/wishListSchema.js";

import bcrypt from "bcryptjs";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      req.body.password = hashedPassword;
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    res.status(200).json({ message: "User has been deleted", user });
  } catch (error) {
    res.status(500).json(error);
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).json("Product saved..!!");
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send("User has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

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

const getAllWishlists = async (req, res) => {
  try {
    const wishLists = await WishList.find();
    res.status(200).json(wishLists);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUserWishlist = async (req, res) => {
  try {
    const wishList = await WishList.findOne({ userID: req.params.id });
    if (!wishList) return res.status(404).json("No wishlist found");
    res.status(200).json(wishList);
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllCarts,
  getCartOfUser,
  getAllOrders,
  getAllOrdersOfUser,
  getOrderOfUserById,
  updateOrder,
  deleteOrder,
  getAllWishlists,
  getUserWishlist,
};
