import Layout from "@/components/page-layout";
import { ProductsContext } from "@/components/products-context"; // ProductsContext to access selected products
import { useContext, useEffect, useState } from "react"; // React hooks for state management and context

export default function CheckOutPage() {
  // Accessing selected products from context
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);

  // State to store detailed product information fetched from the server
  const [productsInfo, setProductsInfo] = useState([]);

  // State for various user input fields related to customer information
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  // Fetching detailed product information based on selected product IDs
  useEffect(() => {
    // The spread operator in conjunction with 'new Set()' ensures that only unique IDs are included in the set
    const uniqueIds = [...new Set(selectedProducts)];

    // Making a fetch request to the "/api/db-products" endpoint with the unique IDs as query parameters
    fetch("/api/db-products?ids=" + uniqueIds.join(",")) // Join method is used to concatenate the unique IDs into a comma-separated string
      .then((response) => response.json()) // Parsing the response as JSON
      .then((json) => setProductsInfo(json)); // Updating the 'productsInfo' state with the JSON data
  }, [selectedProducts]); // The effect depends on the 'selectedProducts' array and will re-run whenever it changes

  // Functions to handle increasing and decreasing product quantity
  function moreOfThisProduct(id) {
    setSelectedProducts((prev) => [...prev, id]);
  }
  function lessOfThisProduct(id) {
    const position = selectedProducts.indexOf(id);
    if (position !== -1) {
      setSelectedProducts((prev) => {
        return prev.filter((value, index) => index !== position);
      });
    }
  }

  // Calculating shipping cost and total price
  let shippingCost = selectedProducts.length > 0 ? 5 : 0;
  let subtotal = 0;
  if (selectedProducts?.length) {
    for (let id of selectedProducts) {
      const price = productsInfo.find((p) => p._id === id)?.price || 0;
      subtotal += price;
    }
  }
  console.log("Subtotal:", subtotal);
  const total = subtotal + shippingCost;

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-3/2 p-4">
            {/* Displaying a message if no products are selected */}
            {!selectedProducts.length && (
              <h1>No products in your shopping cart</h1>
            )}

            {/* Mapping through products and displaying details and quantity controls */}
            {productsInfo.length &&
              // Mapping through the 'productsInfo' array to render details for each selected product
              productsInfo.map((productDetail) => {
                // The 'filter' method returns an array of product IDs that match the current product's ID, and the 'length' property gives the quantity
                const quantity = selectedProducts.filter(
                  (id) => id === productDetail._id
                ).length;

                {
                  /* If the quantity is 0, skip rendering this product */
                }
                if (quantity === 0) return;

                // Render the product details along with controls to adjust the quantity
                return (
                  <div
                    className="flex flex-col lg:flex-row justify-between mb-5"
                    key={productDetail._id}
                  >
                    <div className="flex flex-col lg:flex-row">
                      <div className="bg-rose-100 p-3 rounded-xl shrink-0 mb-4 lg:mb-0 flex justify-center items-center">
                        <img className="w-24" src={productDetail.picture} alt={productDetail.name}></img>
                      </div>
                      <div className="pl-4">
                        <h3 className="font-bold text-lg capitalize">
                          {productDetail.name}
                        </h3>
                        <p className="text-sm">{productDetail.description}</p>
                        <div className="flex mt-4">
                          <div className="grow">${productDetail.price}</div>
                        </div>
                      </div>
                    </div>

                    {/* Buttons to decrease and increase the quantity of the product */}
                    <div className="flex items-center mt-4 lg:mt-0">
                      <button
                        onClick={() => lessOfThisProduct(productDetail._id)}
                        className="bg-violet-500 px-2 rounded-lg text-white"
                      >
                        -
                      </button>
                      <span className="px-2">
                        {
                          selectedProducts.filter(
                            (id) => id === productDetail._id
                          ).length
                        }
                      </span>
                      <button
                        onClick={() => moreOfThisProduct(productDetail._id)}
                        className="bg-violet-500 px-2 rounded-lg text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Customer information and payment form */}
          <div className="w-full md:w-1/3 p-4 mr-3">
            <form action="/api/payment" method="post" className="mb-16 ">
              <input
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="Street address, number"
                className="block w-80 bg-background-300 rounded-lg px-4 py-2 mb-2"
              />
              <input
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                type="text"
                placeholder="City, zip code"
                className="block w-80 bg-background-300 rounded-lg px-4 py-2 mb-2"
              />
              <input
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                placeholder="First name, last name"
                className="block w-80 bg-background-300 rounded-lg px-4 py-2 mb-2"
              />
              <input
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                required
                placeholder="example@example.com"
                className="block w-80 bg-background-300 rounded-lg px-4 py-2 mb-2"
              />
              <div className="flex my-3">
                <h3 className="grow font-bold text-letter-color">Subtotal:</h3>
                <h3 className="font-bold">${subtotal}</h3>
              </div>
              <div className="flex my-3">
                <h3 className="grow font-bold text-letter-color">Shipping:</h3>
                <h3 className="font-bold">${shippingCost}</h3>
              </div>
              <div className="flex my-3 border-t pt-3 border-dashed border-primary">
                <h3 className="grow font-bold text-letter-color">Total:</h3>
                <h3 className="font-bold">${total}</h3>
              </div>
              <input
                type="hidden"
                name="products"
                value={selectedProducts.join(",")}
              />
              <button
                type="submit"
                className="bg-violet-500 hover:bg-rose-500 px-5 py-2 rounded-xl font-bold text-white w-full my-4"
              >
                Pay ${total}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
