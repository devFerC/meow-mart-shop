import { ProductsContextProvider } from "@/components/products-context"; //Context provides access to product-related data across the app
import "@/styles/globals.css";

// The main App component that wraps all pages in the application
export default function App({ Component, pageProps }) {
  return (
    // Wrapping the Component (current page) with the ProductsContextProvider
    // This ensures that product-related data is accessible across all pages
    <ProductsContextProvider>
      <Component {...pageProps} />
    </ProductsContextProvider>
  );
}
