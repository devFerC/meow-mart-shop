import { connectDataBase } from "@/lib/mongoose";
import Order from "@/models/order";
import { buffer } from "micro"; // Utility to handle raw request payload

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Exporting the default handler function for Stripe webhook notifications
export default async function handler(req, res) {
  // Connecting to the database
  await connectDataBase();

  // Defining the webhook signing secret
  const signingSecret= process.env.STRIPE_SIGNING_SECRET;

  // Reading the raw request payload using the 'buffer' utility
  const payload = await buffer(req);

  // Extracting the Stripe signature from the request headers
  const signature = req.headers["stripe-signature"];

  // Verifying and constructing the event using Stripe's SDK
  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    signingSecret
  );

  // Handling the 'checkout.session.completed' event type
  if (event?.type === "checkout.session.completed") {
    // Extracting metadata and payment status from the event data
    const metadata = event.data?.object?.metadata;
    const paymentStatus = event.data?.object?.payment_status;

    // If an order ID is present in metadata and payment status is 'paid', update the order's paid status
    if (metadata?.orderId && paymentStatus === "paid") {
      await Order.findByIdAndUpdate(metadata.orderId, { paid: 1 });
    }
  }

  // Sending a response to acknowledge receipt of the webhook
  res.json("ok");
}

// Configuring Next.js API route to disable the built-in body parser
// This allows handling the raw request payload needed for Stripe webhook verification
export const config = {
  api: {
    bodyParser: false,
  },
};


