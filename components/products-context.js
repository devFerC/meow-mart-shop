import { createContext} from "react";
import useLocalStorageState from "use-local-storage-state";

// Context for products, which will be used to share product data throughout the app
export const ProductsContext = createContext({});

// Context provider component that wrap parts of the app that need access to the products context
export function ProductsContextProvider({ children }) {
  // Using a custom hook to manage selected products in local storage for cart feature,
  // initializing it with an empty array
  const [selectedProducts, setSelectedProducts] = useLocalStorageState('cart', { defaultValue: [] });

  // Returning the provider component,
  // passing the selected products and the setter function as the context value
  return (
    <ProductsContext.Provider value={{ selectedProducts, setSelectedProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}