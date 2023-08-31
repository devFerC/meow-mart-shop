import Product from "@/components/product-layout"; //Product layout component for displaying individual products
import { connectDataBase } from "@/lib/mongoose"; //Function to connect to the MongoDB database
import { useEffect, useState } from "react"; //React hooks for managing state within the component
import { findAllProducts } from "./api/db-products"; // Function to find all products from the database
import Layout from "@/components/page-layout"; //Layout component for wrapping the page content
import Link from "next/link";

// Main Home component, receiving products as a prop
export default function Home({ products }) {
  // State to manage a search or filter phrase
  const [phrase, setPhrase] = useState("");

  // Extracting unique categories from the products
  const nameOfCategories = [...new Set(products.map((p) => p.category))];

  // Filtering products based on the phrase, if present
  if (phrase) {
    products = products.filter((p) =>
      p.name.toLowerCase().includes(phrase.toLowerCase())
    );
  }

  return (
    <Layout>
      <div className="ml-6">
        {/* Search input field */}
        <input
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          type="text"
          placeholder="Search our products"
          className="bg-white w-full py-2 px-4 rounded-xl"
        ></input>

        {/* Banner image */}
        <div className="relative h-[20vh] md:h-80 w-full my-6 rounded-lg overflow-hidden z-0 mr-5 ">
          <Link href={`/scratchers`}>
            <img
              src="/arrival-banner.png"
              alt="Banner"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </Link>
        </div>

        <div>
          {/* Looping through categories and displaying products */}
          {nameOfCategories.map((categoryName) => (
            <div key={categoryName}>
              {/* Checking if there are products in the category */}
              {/* The 'find' method returns the first element that satisfies the condition,
                so if it returns a truthy value, it means there's at least one product in this category. */}
              {products.find((p) => p.category === categoryName) && (
                <div>
                  {/* Category header */}
                  <h2 className="my-4 text-2xl text-letter-color font-semibold capitalize">
                    {categoryName}
                  </h2>

                  {/* Displaying products within the category */}
                  {/* Filter method returns a new array containing all the elements that satisfy the condition. */}
                  {/* Map method to iterate over the filtered products and render each one.*/}
                  <div className=" ml-10 py-5 flex -mx-5 overflow-x-scroll snap-x scrollbar-hide w-11/12">
                    {products
                      .filter((p) => p.category === categoryName)
                      .map((productInfo) => (
                        <div key={productInfo._id} className="px-5 snap-start">
                          {/* Product component for individual product */}
                          <Product {...productInfo} />
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

// Function to fetch products server-side and pass them as props to the component
export async function getServerSideProps() {
  // Connecting to the database
  await connectDataBase();

  // Fetching all products
  const products = await findAllProducts();

  return {
    props: {
      // Serializing products to JSON
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
