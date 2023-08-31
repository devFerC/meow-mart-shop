import Link from "next/link";
import React from "react";
import { AiFillCloseCircle } from "react-icons/ai"; // Close icon

// Defining the Sidebar component, accepting props for controlling its open/close state
const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Button to Open Sidebar */}
      <button
        onClick={toggleSidebar}
        className={`w-5 h-20 bg-rose-800 rounded-tr-md rounded-br-md fixed left-0 mt-40 ${
          isOpen ? "hidden" : ""
        }`}
      ></button>

      {/* Sidebar Content */}
      <aside
        className={`mt-8 border-r border-stone-300 p-4 h-full w-full md:w-64 flex flex-col fixed left-0 top-[60px] text-primary ${
          isOpen ? "" : "hidden"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={toggleSidebar}
          className="px-4 py-2 rounded-md absolute right-0 top-5 text-rose-800"
        >
          <AiFillCloseCircle size="2rem" />
        </button>

        <h2 className="text-2xl font-semibold mb-4 ml-3 text-stone-900">
          Explore
        </h2>

        {/* Sidebar Buttons */}
        <div className="mb-4 mt-6">
          <Link href={`/smart%20e-toys`}>
            <button className="py-2 px-4 bg-rose-300 text-stone-900 rounded-full mb-2 w-full">
              Smart e-Toys
            </button>
          </Link>
          <Link href={`/treat%20puzzles`}>
            <button className="py-2 px-4 bg-rose-300 text-stone-900 rounded-full mb-2 w-full">
              Treat Puzzles
            </button>
          </Link>
          <Link href={`/scratchers`}>
            <button className="py-2 px-4 bg-rose-300 text-stone-900 rounded-full mb-2 w-full">
              Scratchers
            </button>
          </Link>
          <Link href={"/checkout"}>
            <button className="py-2 px-4 bg-purple-200 text-stone-900 rounded-full mb-2 w-full">
              Cart
            </button>
          </Link>
        </div>

        <div className="overflow-hidden">
          <Link href={`/scratchers`}>
            <img
              src="/new-sidebar.png"
              alt="New-Arrivals"
              className="w-full object-cover"
            />
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
