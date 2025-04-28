import React from "react";
import Exports from "../utils/export";

/**
 * Navbar Component
 * Displays logo, site title, and the search bar.
 */
const Navbar = ({ onSearch }) => {
  return (
    <nav className="max-w-[1440px] mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex flex-col gap-2 items-center">
        <img src={Exports.images.logo} alt="logo" className="w-[140px]" />
        <h1 className="text-[18px] font-[700] text-[#FFCB05] text-border-md leading-0">
          CARDS
        </h1>
      </div>

      <Exports.components.SearchBar onSearch={onSearch} />
    </nav>
  );
};

export default Navbar;
