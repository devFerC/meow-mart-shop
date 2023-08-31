import { connectDataBase } from "../../lib/mongoose";
import Product from "../../models/products-model";
import Order from "../../models/order";

// Initializing the Stripe module with the secret key
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Exporting the default handler function for payment-related requests
export default async function handler(req, res) {
  // Connecting to the database
  await connectDataBase();

  // Checking if the request method is not POST
  if (req.method !== "POST") {
    // Sending an error response if the request is not a POST request
    res.json("should a post but its not!");
    return;
  }

  // Destructuring necessary information from the request body
  const { email, name, address, city } = req.body;

  // Splitting the product IDs from the request body and removing duplicates
  const productsIds = req.body.products.split(",");
  const uniqIds = [...new Set(productsIds)]; // Using Set to filter unique IDs

  // Fetching the unique products from the database
  const products = await Product.find({ _id: { $in: uniqIds } }).exec();

  // Initializing an empty array to hold line items for the order
  let line_items = [];

  // Iterating through the unique product IDs
  for (let productId of uniqIds) {
    // Calculating the quantity of the current product by counting how many times the product ID appears in the productsIds array
    const quantity = productsIds.filter((id) => id === productId).length;

    // Finding the corresponding product object from the 'products' array using the product ID
    const product = products.find((p) => p._id.toString() === productId);

    // Determining the shipping cost; set to 5 if there's at least one quantity, otherwise 0
    const shippingCost = quantity > 0 ? 5 : 0;

    // Constructing the line item object for the current product
    line_items.push({
      quantity, // Quantity of the product
      price_data: {
        currency: "USD", // Currency for the payment
        product_data: { name: product.name }, // Product name
        unit_amount: product.price * 100 + shippingCost, // Unit price in cents (multiplied by 100), plus the shipping cost if applicable
      },
    });
  }

  // Creating an Order record in the database
  const order = await Order.create({
    products: line_items,
    name,
    email,
    address,
    city,
    paid: 0, // Order marked as unpaid
  });

  // Creating a Stripe checkout session for the payment
  const session = await stripe.checkout.sessions.create({
    line_items: line_items,
    mode: "payment",
    customer_email: email,
    success_url: `${req.headers.origin}/?success=true`,
    cancel_url: `${req.headers.origin}/?canceled=true`,
    metadata: { orderId: order._id.toString() }, // Storing order ID in metadata
  });

  // Redirecting the user to the Stripe checkout URL
  res.redirect(303, session.url);
}
