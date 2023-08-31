// Importing necessary items from the "mongoose" library
import { model, models, Schema } from "mongoose";

// Defining the schema for an order, including properties for products, name, email, address, city, and payment status
const OrderSchema = new Schema(
  {
    products: Object, // The products in the order, represented as an object
    name: String, // The name of the customer
    email: String, // The email address of the customer
    address: String, // The shipping address
    city: String, // The city for shipping
    paid: {
      // A field representing payment status, with a default value of 0
      type: Number,
      defaultValue: 0,
    },
  },
  { timestamps: true }
); // Enabling timestamps to automatically track creation and modification times

// Creating the Order model, or using the existing one if it already exists
const Order = models?.Order || model("Order", OrderSchema);

// Exporting the Order model
export default Order;
