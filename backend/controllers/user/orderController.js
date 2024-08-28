import Stripe from "stripe";
import Order from "../../schema/orderSchema.js";
import CustomError from "../../utils/CustomError.js";

const checkout = async (req, res, next) => {
  const { products } = req.body;
  if (!products || products.length === 0)
    return next(new CustomError("No products found in the order", 400));

  const newOrder = await new Order({
    ...req.body,
    userID: req.user.id,
  }).populate("products.productID", "name price image");

  if (!newOrder) return next(new CustomError("Order not created", 400));

  // check if all products are available
  const hasUnavailableProducts = newOrder.products.some(
    (product) =>
      !product.productID || !product.productID.name || !product.productID.price
  );

  if (hasUnavailableProducts) {
    return next(
      new CustomError("Some products are unavailable or incomplete", 400)
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // create a stripe instance

  const lineData = newOrder.products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.productID.name,
        images: [product.productID.image],
      },
      unit_amount: product.productID.price * 100,
    },
    quantity: product.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineData,
    ui_mode: "embedded",
    mode: "payment",
    return_url: `${process.env.FRONTEND_URL}/checkout/success/{CHECKOUT_SESSION_ID}`,
  });

  newOrder.sessionID = session.id;
  await newOrder.save(); // save the order to the database after successful payment

  res
    .status(200)
    .json({ newOrder, id: session.id, clientSecret: session.client_secret });
};

const checkoutSuccess = async (req, res, next) => {
  const { session_id } = req.body;
  const order = await Order.findOne({ sessionID: session_id });
  if (!order) return next(new CustomError("Order not found", 404));
  if (order.paymentStatus === "paid")
    return next(new CustomError("Status already updated", 400));
  order.paymentStatus = "paid";
  order.shippingStatus = "processing";
  const updatedOrder = await (
    await order.save()
  ).populate("products.productID");
  res.status(200).json(updatedOrder);
};

const createOrder = async (req, res, next) => {
  const newOrder = await new Order({
    ...req.body,
    userID: req.user.id,
  }).populate("products.productID", "name price image");

  if (!newOrder) return next(new CustomError("Order not created", 400));

  // check if all products are available
  const hasUnavailableProducts = newOrder.products.some(
    (product) =>
      !product.productID || !product.productID.name || !product.productID.price
  );

  if (hasUnavailableProducts) {
    return next(
      new CustomError("Some products are unavailable or incomplete", 400)
    );
  }
  const savedOrder = await newOrder.save();
  console.log(savedOrder);
  res.status(200).json(savedOrder);
};

const getAllOrdersOfUser = async (req, res, next) => {
  const orders = await Order.find({ userID: req.user.id }).populate(
    "products.productID"
  );
  if (!orders || orders.length === 0)
    return next(new CustomError("No orders found", 404));
  res.status(200).json(orders);
};

const getOrder = async (req, res, next) => {
  const order = await Order.findOne({
    _id: req.params.orderID,
    userID: req.user.id,
  }).populate("products.productID");
  if (!order) return next(new CustomError("Order not found", 404));
  res.status(200).json(order);
};

const cancelOrder = async (req, res, next) => {
  const updatedOrder = await Order.findOneAndUpdate(
    { _id: req.params.orderID, userID: req.user.id },
    {
      $set: { shippingStatus: "cancelled", info: req.body.info || "" },
    },
    { new: true }
  );
  if (!updatedOrder) return next(new CustomError("Order not found", 404));
  res.status(200).json(updatedOrder);
};

export {
  createOrder,
  getAllOrdersOfUser,
  getOrder,
  checkout,
  cancelOrder,
  checkoutSuccess,
};
