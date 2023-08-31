import { useContext } from "react";
import { ProductsContext } from "./products-context";

// Defining the Product component, accepting product details as props
export default function Product({ _id, name, description, price, picture }) {
  
  // Accessing the setSelectedProducts function from the products context
  const { setSelectedProducts } = useContext(ProductsContext);

  // Function to add the product to the selected products (cart)
  function addProduct() {
    setSelectedProducts((prev) => [...prev, _id]);
  }
  return (
    <div className="w-64">
      {/* Product Image */}
      <div className="bg-rose-100 p-5 rounded-xl ">
        <img src={picture} alt={picture} />
      </div>

      {/* Product Name */}
      <div className="mt-2">
        <h3 className="font-bold text-lg capitalize " key={_id}>
          {name}
        </h3>
      </div>

      {/* Product Description */}
      <p className="text-sm mt-1 leading-4 h-20" key={description}>
        {description}
      </p>

      {/* Price and Add Button */}
      <div className="flex mt-1">
        <div className="text-2xl font-bold grow" key={price}>
          ${price}
        </div>
        <button
          onClick={addProduct}
          className="bg-violet-500 text-white py-1 px-3 rounded-xl"
        >
          +
        </button>
      </div>
    </div>
  );
}
