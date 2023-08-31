// Importing necessary items from the "mongoose"
const { Schema, models, model } = require("mongoose");

// Defining the schema for a product, including properties for category, name, description, price, and picture
const ProductSchema = new Schema({
  category: String, // The category of the product
  name: String, // The name of the product
  description: String, // A description of the product
  price: Number, // The price of the product
  picture: String, // A URL or path to the picture of the product
});

// Creating the Product model, or using the existing one if it already exists
const Product = models?.Product || model("Product", ProductSchema);

// Exporting the Product model
export default Product;
