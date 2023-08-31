import Head from "next/head";
import NavBar from "./navbar";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "./products-context";
import Sidebar from "./sidebar";

// Layout component
export default function Layout({children}) {

  // Accessing the setSelectedProducts function from the products context
  const {setSelectedProducts} = useContext (ProductsContext);

  // State to manage success message after a successful purchase
  const [success, setSuccess] = useState (false);

  // State to manage the sidebar's open/close state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar's open/close state
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Effect to check the URL for 'success' and reset selected products if found
  useEffect (()=> {
    if (window.location.href.includes ('success')) {
      setSelectedProducts ([]);
      setSuccess(true);
    }
  }, []);

  return (
    <div className="bg-purple-50">
      <Head>
      <title>MeowMart</title>
      </Head>
      <NavBar/> {/* Navigation bar component */}
      <div >
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> {/* Sidebar component */}
        <div className={`p-5 mt-20 ${isSidebarOpen ? 'ml-64 hidden md:block' : 'ml-0'}`}>
          {success && (
            <div className="mb-5 bg-rose-50 text-white text-lg p-5 rounded-xl">Thanks for your order!</div>
          )}
          {children} {/* Content passed to the Layout component */}
        </div>
      </div>
    </div>

  )
}