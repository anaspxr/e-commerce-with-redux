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
    const data = await Cart.findOne({ userID: req.user.id }).populate({
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

const updateCart = async (req, res) => {
  try {
    const { productID, quantity } = req.body;

    if (quantity < 1)
      //if quantity is less than 1 , send error
      return res.status(400).json({
        message: `Invalid Quantity:${quantity}, Quantity can't be less than 1`,
      });

    let cart = await Cart.findOne({ userID: req.user.id });

    if (!cart) {
      // if there is no cart for the user, create one
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
        cart.products[productIndex].quantity = quantity;
      } else {
        // if product doesn't exist in the cart, add it
        cart.products.push({ productID, quantity });
      }
    }
    const savedCart = await cart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userID: req.user.id, "products.productID": req.body.productID },
      {
        $pull: { products: { productID: req.body.productID } },
      },
      { new: true }
    );
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Product not found in Cart" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export { getAllCarts, getCartOfUser, updateCart, removeFromCart };
