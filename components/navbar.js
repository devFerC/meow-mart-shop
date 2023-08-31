import Link from "next/link";
import { useContext } from "react";
import { ProductsContext } from "./products-context";
import { FaBagShopping } from "react-icons/fa6"; // Shopping bag icon
import { HiMiniHome } from "react-icons/hi2"; // Home icon

export default function NavBar() {
  // Using the products context to get the selected products
  const { selectedProducts } = useContext(ProductsContext);
  return (
    <div>
      <nav className="bg-purple-50 px-5 w-full flex drop-shadow-lg justify-between items-center fixed top-0 text-rose-800 z-10 ">
        
        {/* Logo Section with link to the home page*/}
        <Link href={"/"}>
          <img src="/navbar-logo-letter.png" alt="Logo" className="h-20 p-2" />
        </Link>

        {/* Navigation Items */}
        <div className="flex justify-end items-center space-x-4">
          
          {/* Home Icon Link */}
          <Link href={"/"} className="hover:text-rose-950">
            <HiMiniHome size="2rem" />
          </Link>

          {/* Shopping Bag Icon Link */}
          <Link href={"/checkout"} className="flex hover:text-rose-950">
            <FaBagShopping size="1.75rem" />
            {/* Displaying the number of items in the cart */}
            <span className=" pt-1 ml-2">{selectedProducts.length}</span>
          </Link>
          
        </div>
      </nav>
    </div>
  );
}
