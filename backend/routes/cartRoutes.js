import express from "express";
import Cart from "../schema/cartSchema.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// create cart
router.post("/", verifyToken, async (req, res) => {
  try {
    const alreadyExist = await Cart.findOne({ userID: req.body.userID });
    if (alreadyExist) {
      res.status(400).send("Cart for this user already exists in the database");
    } else {
      const newCart = new Cart(req.body);
      const savedCart = await newCart.save();
      res.status(200).json(savedCart);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
