// Importing the mongoose library
import mongoose from "mongoose";

// Exporting an asynchronous function to connect to the MongoDB database
export async function connectDataBase() {
  // Checking if the connection is already established (readyState === 1)
  if (mongoose.connection.readyState === 1) {
    // If connected, return the existing connection as a promise
    return mongoose.connection.asPromise();
  }
  // If not connected, connect to the MongoDB database using the MONGODB_URL environment variable
  return await mongoose.connect(process.env.MONGODB_URL);
}
