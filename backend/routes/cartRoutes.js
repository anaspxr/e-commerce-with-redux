import express from "express";
import Cart from "../schema/cartSchema.js";
import {
  verifyToken,
  verifyTokenAndAdmin,
} from "../middlewares/verifyToken.js";

const router = express.Router();

// add items to cart
router.patch("/quantity", verifyToken, async (req, res) => {
  try {
    const { productID, quantity } = req.body;

    let cart = await Cart.findOne({ userID: req.user.id });

    if (!cart) {
      // if no cart exists for the user, create a new cart
      cart = new Cart({
        userID: req.user.id,
        products: [{ productID, quantity }],
      });
    } else {
      // checking if the product is already in the cart
      const productIndex = cart.products.findIndex(
        (p) => p.productID.toString() === productID
      );

      if (productIndex > -1) {
        // product exists in the cart, update the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // product doesn't exist in the cart, add it
        cart.products.push({ productID, quantity });
      }
    }

    // Save the cart
    const savedCart = await cart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.patch("/remove", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userID: req.user.id, "products.productID": req.body.productID },
      {
        $pull: { products: { productID: req.body.productID } }, // if product exists, delete
      },
      { new: true }
    );
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//admin
// get all cart
router.get("/", verifyTokenAndAdmin, async (req, res) => {
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
});

// get cart of individual users
router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const data = await Cart.findOne({ userID: req.params.id });
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "No cart found for this user" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
