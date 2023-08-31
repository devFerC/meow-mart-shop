import { connectDataBase } from "@/lib/mongoose";
import Product from "@/models/products-model";

// Function to find and return all products from the database
export async function findAllProducts() {
  // Using the 'find()' method without any argument to fetch all documents in the Product collection
  // The 'exec()' method is used to return a Promise, which can be awaited in the calling function
  return Product.find().exec();
}

// Function to find and return all products from the database that match a specific category
export async function findAllProductsByCategory(category) {
  return Product.find({ category }).exec(); // Fetch products with the specified category
}

// Default handler function to process HTTP requests related to products
export default async function handle(req, res) {
  // Connecting to the database using the imported 'connectDataBase' function
  await connectDataBase();
  // Destructuring 'ids' from the query parameters in the request
  const { ids } = req.query;
  if (ids) {
    // If 'ids' is present, split it into an array using the ',' separator
    const idsArray = ids.split(",");
    // Find and return products that match the specified '_id's in the 'idsArray'
    // The '$in' operator checks for matching values within an array
    res.json(await Product.find({ _id: { $in: idsArray } }).exec());
  } else {
    // If 'ids' is not present, return all products by calling the 'findAllProducts' function
    res.json(await findAllProducts());
  }
}
