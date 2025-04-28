import React from "react";
import { FiFilter } from 'react-icons/fi';
import typeStyles from "../utils/typeStyle";

/**
 * FilterTypes Component
 * 
 * This component renders a filter UI that allows users to filter by different types. 
 * It displays a list of types and highlights the selected ones with a distinct style.
 * 
 * Props:
 * - types (Array): A list of types to be displayed as filter options.
 * - selectedTypes (Array): A list of types that are currently selected.
 * - onTypeToggle (Function): A function to handle toggling the selection of a type.
 */
const FilterTypes = ({ types, selectedTypes, onTypeToggle }) => {
  return (
    <div className="mb-8">
      {/* Filter Header */}
      <div className="flex items-center gap-2 mb-4 text-[16px]">
        <FiFilter className="text-[#FFCB05]" />
        <h3 className="text-white font-bold ">Filter by Type</h3>
      </div>
      
      {/* Filter Button Group */}
      <div className="flex flex-wrap gap-2">
        {types.map(type => {
          // Determine the style based on the type
          const typeStyle = typeStyles[type] || { 
            color: '#CCCCCC', 
            gradient: 'linear-gradient(135deg, #CCCCCC, #999999)' 
          };
          
          return (
            <button
              key={type}
              onClick={() => onTypeToggle(type)}  // Toggle the type on button click
              className={`px-3.5 py-2 rounded-full capitalize text-white transition-all duration-300  text-[14px] ${
                selectedTypes.includes(type) 
                ? 'shadow-lg transform scale-105'  // Apply style if type is selected
                : 'opacity-70 hover:opacity-100'   // Default style for unselected types
              }`}
              style={{ 
                background: selectedTypes.includes(type) ? typeStyle.gradient : 'rgba(255,255,255,0.1)'  // Background gradient or transparent for selected/unselected
              }}
            >
              {type} {/* Display the type name */}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterTypes;
