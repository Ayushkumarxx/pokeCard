/**
 * Exports utility module
 *
 * This module exports various components, images, and pages used throughout the application.
 *
 * @module exports
 * @exports {Object} Exports - An object containing the exported components, images, and pages.
 */

import Home from "../pages/Home";

/**
 * Page components
 */
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import PokemonCard from "../components/PokemonCard";
import FilterTypes from "../components/FilterTypes";
import NoResults from "../components/NoResults";

/**
 * Image assets
 */
import logo from "../assets/logo.png";
import pokeBall from "../assets/pokeball.png";

/**
 * Exports object
 */
let Exports = {
  /**
   * Page components
   */
  pages: {
    Home: Home,
  },
  /**
   * Image assets
   */
  images: {
    logo: logo,
    pokeBall: pokeBall,
  },
  /**
   * Component modules
   */
  components: {
    Navbar: Navbar,
    SearchBar: SearchBar,
    PokemonCard: PokemonCard,
    FilterTypes: FilterTypes,
    NoResults: NoResults,
  },
};

/**
 * Default export
 */
export default Exports;
