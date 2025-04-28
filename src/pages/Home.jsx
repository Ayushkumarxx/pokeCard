import React, { useState, useEffect } from "react";
import Exports from "../utils/export";
import PokemonCard from "../components/PokemonCard";
import FilterTypes from "../components/FilterTypes";
import NoResults from "../components/NoResults";
import axios from 'axios';
import "../styles/animations.css";
import fetchPokemon from "../utils/fetchPokemon";

/*************  ✨ Windsurf Command 🌟  *************/
/**
 * Home Component
 * 
 * This component serves as the main page displaying the Pokémon cards.
 * It fetches Pokémon data, applies filters and search, and manages the loading state.
 * 
 * @returns {JSX.Element} - A JSX element representing the home page with Pokémon cards.
 */
const Home = () => {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [allTypes, setAllTypes] = useState([]);

  // Load Pokémon data on component mount
  useEffect(() => {
    const loadPokemonData = async () => {
      setLoading(true);  // Start loading state before calling fetchPokemon

      // Fetch Pokémon data and update state with the result
      // Fetch Pokemon data and update state with the result
      const formattedPokemon = await fetchPokemon(setLoading);

      setPokemon(formattedPokemon);
      setFilteredPokemon(formattedPokemon);

      // Extract unique types from the fetched Pokémon
      const types = [...new Set(formattedPokemon.flatMap(p => p.types))];
      setAllTypes(types);
    };

    loadPokemonData();
  }, []);

  // Apply filters and search when searchTerm, selectedTypes, or pokemon changes
  // Apply filters and search
  useEffect(() => {
    let results = pokemon;
    
    // Apply search term filter
    // Apply search term
    if (searchTerm) {
      results = results.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply type filters
    if (selectedTypes.length > 0) {
      results = results.filter(p => 
        p.types.some(type => selectedTypes.includes(type))
      );
    }
    
    setFilteredPokemon(results);
  }, [searchTerm, selectedTypes, pokemon]);

  // Handle search term update
  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Handle type toggle for filtering
  // Handle type toggle
  const handleTypeToggle = (type) => {
    setSelectedTypes(prev => {
      const newTypes = new Set(prev);
      newTypes.has(type) ? newTypes.delete(type) : newTypes.add(type);
      return [...newTypes];
    });
  };

  // Display loading animation if data is still loading
  // Loading animation
  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] flex justify-center items-center">
        <div className="text-center">
          <img 
            src={Exports.images.pokeBall} 
            alt="Loading" 
            className="w-20 h-20 mx-auto mb-4 animate-bounce"
          />
          <p className="text-xl text-[#FFCB05] font-extrabold text-border-md">Loading Pokémon...</p>
        </div>
      </div>
    );
  }

  // Render main content once loading is complete

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Exports.components.Navbar onSearch={handleSearch} />
      
      <div className="max-w-[1440px] mx-auto px-4 py-8">
       
        <FilterTypes 
          types={allTypes} 
          selectedTypes={selectedTypes} 
          onTypeToggle={handleTypeToggle} 
        />
        
        {filteredPokemon.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredPokemon.map(poke => (
              <PokemonCard key={poke.id} pokemon={poke} />
            ))}
          </div>
        ) : (
          <NoResults searchTerm={searchTerm} />
        )}
      </div>
      
      <footer className="bg-[#1A1A1A] py-6 mt-12">
        <div className="max-w-[1440px] mx-auto px-4 text-center text-gray-400">
          <p>Data provided by <a href="https://pokeapi.co/" className="text-[#FFCB05] hover:underline">PokeAPI</a></p>
        </div>
      </footer>
    </div>
  );
};
/*******  a3bc82a2-0505-41d7-b465-b802ce4d6184  *******/

export default Home;