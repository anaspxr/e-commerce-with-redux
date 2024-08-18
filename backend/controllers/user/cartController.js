import Cart from "../../schema/cartSchema.js";
import CustomError from "../../utils/CustomError.js";
import tryCatch from "../../utils/trycatch.js";

const getCartOfUser = tryCatch(async (req, res, next) => {
  const data = await Cart.findOne({ userID: req.user.id }).populate({
    path: "products.productID",
    select: "name price image", // fields to get from populate
  });

  if (data) {
    res.status(200).json(data);
  } else {
    next(new CustomError("No cart found for the user", 404));
  }
});

const updateCart = tryCatch(async (req, res, next) => {
  const { productID, quantity } = req.body;

  if (quantity < 1) {
    //if quantity is less than 1 , send error
    next(new CustomError(`Invalid quantity: ${quantity}`, 400));
  }

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
});

const removeFromCart = tryCatch(async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    //find the cart of the user with user id and remove the product
    { userID: req.user.id, "products.productID": req.body.productID },
    {
      $pull: { products: { productID: req.body.productID } },
    },
    { new: true }
  );
  if (cart) {
    res.status(200).json(cart);
  } else {
    next(new CustomError("Product not found in the cart", 404));
  }
});

export { getCartOfUser, updateCart, removeFromCart };
