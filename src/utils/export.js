import Home from "../pages/Home";


import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import PokemonCard from "../components/PokemonCard";


import logo from '../assets/logo.png';
import pokeBall from '../assets/pokeball.png';
let Exports = {
    pages: {
    
        Home: Home
    },
    images:
    {
        logo: logo,
        pokeBall: pokeBall
    },
    components:{
        Navbar: Navbar,
        SearchBar: SearchBar,
        PokemonCard: PokemonCard
    }
  
};

export default Exports;