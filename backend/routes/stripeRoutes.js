// todo: complete the payment functionality
import express from "express";
import Stripe from "stripe";
import Order from "../schema/orderSchema.js";
const route = express.Router();

const handleStripeWebhook = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Handle the event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Find the order associated with this session
      const order = await Order.findOne({ sessionID: session.id });

      if (order) {
        order.status = "completed";
        await order.save();
      }
    }

    // Return a response to acknowledge receipt of the event
    res.status(200).send("Webhook received");
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

route.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const event = JSON.parse(req.body);
    console.log(req.body);
    console.log(event);

    res.status(200).json("received");
  }
);

export default route;
