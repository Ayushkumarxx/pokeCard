import React, { useState, useEffect } from "react";
import Exports from "../utils/export";
import "../styles/animations.css";
import fetchPokemon from "../utils/fetchPokemon";

const Home = () => {
  // State to store all Pokémon data, filtered Pokémon data, loading state, search term, selected types, and all unique types.
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [allTypes, setAllTypes] = useState([]);

  // useEffect hook to load Pokémon data when the component mounts.
  useEffect(() => {
    const loadPokemonData = async () => {
      setLoading(true); // Set loading state to true before fetching data

      // Fetch Pokémon data and update state
      const formattedPokemon = await fetchPokemon(setLoading);

      setPokemon(formattedPokemon);
      setFilteredPokemon(formattedPokemon);

      // Extract unique Pokémon types from the fetched data
      const types = [...new Set(formattedPokemon.flatMap((p) => p.types))];
      setAllTypes(types);
    };

    loadPokemonData();
  }, []);

  // useEffect hook to filter Pokémon based on search term and selected types whenever they change.
  useEffect(() => {
    let results = pokemon;

    // Apply search filter based on the search term
    if (searchTerm) {
      results = results.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filters
    if (selectedTypes.length > 0) {
      results = results.filter((p) =>
        p.types.some((type) => selectedTypes.includes(type))
      );
    }

    setFilteredPokemon(results); // Update filtered Pokémon list based on search and type filters
  }, [searchTerm, selectedTypes, pokemon]);

  // Function to handle search term input changes
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Function to toggle Pokémon types for filtering
  const handleTypeToggle = (type) => {
    setSelectedTypes((prev) => {
      const newTypes = new Set(prev);
      newTypes.has(type) ? newTypes.delete(type) : newTypes.add(type);
      return [...newTypes];
    });
  };

  // Loading state: display loading animation while Pokémon data is being fetched
  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] flex justify-center items-center">
        <div className="text-center">
          <img
            src={Exports.images.pokeBall}
            alt="Loading"
            className="w-20 h-20 mx-auto mb-4 animate-bounce"
          />
          <p className="text-xl text-[#FFCB05] font-extrabold text-border-md">
            Loading Pokémon...
          </p>
        </div>
      </div>
    );
  }

  // Render the main content after loading is complete
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Navbar with search functionality */}
      <Exports.components.Navbar onSearch={handleSearch} />

      <div className="max-w-[1440px] mx-auto px-4 py-8">
        {/* Filter component to select Pokémon types */}
        <Exports.components.FilterTypes
          types={allTypes}
          selectedTypes={selectedTypes}
          onTypeToggle={handleTypeToggle}
        />

        {/* Display Pokémon cards if there are filtered results, else show NoResults */}
        {filteredPokemon.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredPokemon.map((poke) => (
              <Exports.components.PokemonCard key={poke.id} pokemon={poke} />
            ))}
          </div>
        ) : (
          <Exports.components.NoResults searchTerm={searchTerm} />
        )}
      </div>

      {/* Footer with PokeAPI attribution */}
      <footer className="bg-[#1A1A1A] py-6 mt-12">
        <div className="max-w-[1440px] mx-auto px-4 text-center text-gray-400">
          <p>
            Data provided by{" "}
            <a
              href="https://pokeapi.co/"
              className="text-[#FFCB05] hover:underline"
            >
              PokeAPI
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
