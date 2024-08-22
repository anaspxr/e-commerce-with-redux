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
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}/orders/success`,
    cancel_url: `${process.env.FRONTEND_URL}/orders/cancel`,
  });

  newOrder.sessionID = session.id;
  const savedOrder = await newOrder.save(); // save the order to the database after successful payment
  console.log(savedOrder);

  res.status(200).json({ newOrder, id: session.id });
};

const getAllOrdersOfUser = async (req, res, next) => {
  const orders = await Order.find({ userID: req.user.id });
  if (!orders || orders.length === 0)
    return next(new CustomError("No orders found", 404));
  res.status(200).json(orders);
};

const getOrder = async (req, res, next) => {
  const order = await Order.findOne({
    _id: req.params.orderID,
    userID: req.user.id,
  });
  if (!order) return next(new CustomError("Order not found", 404));
  res.status(200).json(order);
};

const cancelOrder = async (req, res, next) => {
  const updatedOrder = await Order.findOneAndUpdate(
    { _id: req.params.orderID, userID: req.user.id },
    {
      $set: { status: "cancelled", info: req.body.info || "" },
    },
    { new: true }
  );
  if (!updatedOrder) return next(new CustomError("Order not found", 404));
  res.status(200).json(updatedOrder);
};

export { getAllOrdersOfUser, getOrder, checkout, cancelOrder };

// const idempotencyKey = v4();
// return stripe.customers
//   .create({
//     email: token.email,
//     source: token.id,
//   })
//   .then((customer) => {
//     stripe.charges.create(
//       {
//         amount: amount * 100,
//         currency: "inr",
//         customer: customer.id,
//         receipt_email: token.email,
//         description: "sPurchased the products",
//         shipping: {
//           name: token.card.name,
//           address: token.card.address,
//         },
//       },
//       { idempotencyKey }
//     );
//   })
//   .then((result) => {
//     res.status(200).json(result);
//   })
//   .catch((error) => {
//     console.log(error);
//     return next(new CustomError("Payment failed", 400));
//   });
