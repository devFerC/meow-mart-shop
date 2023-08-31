import Product from "@/components/product-layout";
import { connectDataBase } from "@/lib/mongoose";
import { findAllProductsByCategory } from "./api/db-products";
import Layout from "@/components/page-layout";
import { useRouter } from "next/router";

export default function ProductsByCategory({ products }) {
  // Using Next.js's useRouter hook to access the router object
  const router = useRouter();

  // Extracting the category from the URL query parameters
  const { category } = router.query; 
  
  // Filter products based on the category
  const filteredProducts = products.filter(p => p.category === category);

  //console.log("Fetched products:", products);

  return (
    <Layout>
      <div className="ml-14">
        {/* Banner image */}
        <div className="relative h-[20vh] w-full my-10 rounded-lg overflow-hidden z-0 mr-5">
          <img src="/arrival-banner.png" alt="Banner" className="absolute inset-0 w-full h-full object-cover" />
        </div>

        {/* Category name heading */}
        <h2 className="text-2xl font-semibold mt-4 capitalize mb-5">{category}</h2> {/* Category Name */}

        {/* Grid layout for displaying products */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2 gap-24">
          {/* Mapping through the filtered products and rendering each one using the Product component */}
          {filteredProducts.map(product => (
            <Product key={product._id} {...product} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

// Fetch products from the database (modify this part as needed)
export async function getServerSideProps(context) {

  await connectDataBase(); // Connecting to the database
  const category = context.params.category; // Extracting the category from the URL parameters
  const products = await findAllProductsByCategory(category); // Fetching products by category
  
  return {
    props: {
      // Sending the fetched products as props to the component
      products: JSON.parse(JSON.stringify (products)),
    },
  };
}