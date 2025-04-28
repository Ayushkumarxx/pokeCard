import axios from 'axios';

const fetchPokemon = async (setLoading) => {
  try {
    // Set loading state to true when starting to fetch
    setLoading(true);

    // Get list of first 150 Pokemon
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
    const data = response.data;

    // Fetch detailed data for each Pokemon using Promise.all
    const pokemonData = await Promise.all(
      data.results.map(async (pokemon) => {
        const detailResponse = await axios.get(pokemon.url);
        return detailResponse.data;
      })
    );

    // Transform the data
    const formattedPokemon = pokemonData.map(p => ({
      id: p.id,
      name: p.name,
      image: p.sprites.other['official-artwork'].front_default || p.sprites.front_default,
      types: p.types.map(type => type.type.name),
      stats: {
        hp: p.stats.find(stat => stat.stat.name === 'hp')?.base_stat || 0,
        attack: p.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 0,
        defense: p.stats.find(stat => stat.stat.name === 'defense')?.base_stat || 0,
        speed: p.stats.find(stat => stat.stat.name === 'speed')?.base_stat || 0
      }
    }));

    // Return the transformed data so that you can update your state in the component
    return formattedPokemon;

  } catch (error) {
    console.error('Error fetching Pokemon:', error);
    return [];
  } finally {
    // Set loading state to false once fetching is complete (even if there is an error)
    setLoading(false);
  }
};


// New function to fetch a specific Pokémon by name or ID
const fetchSpecificPokemon = async (searchTerm, setLoading) => {
  try {
    // Set loading state to true when starting to fetch
    setLoading(true);
    
    // Make the search term lowercase for consistent API calls
    const term = searchTerm.toLowerCase().trim();
    
    // Fetch the specific Pokémon
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${term}`);
    const p = response.data;
    
    // Transform the data in the same format as the main function
    const formattedPokemon = {
      id: p.id,
      name: p.name,
      image: p.sprites.other['official-artwork'].front_default || p.sprites.front_default,
      types: p.types.map(type => type.type.name),
      stats: {
        hp: p.stats.find(stat => stat.stat.name === 'hp')?.base_stat || 0,
        attack: p.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 0,
        defense: p.stats.find(stat => stat.stat.name === 'defense')?.base_stat || 0,
        speed: p.stats.find(stat => stat.stat.name === 'speed')?.base_stat || 0
      }
    };
    
    // Return as an array with a single item to maintain consistency with the main function
    return [formattedPokemon];
    
  } catch (error) {
    console.error(`Error fetching specific Pokémon "${searchTerm}":`, error);
    return [];
  } finally {
    // Set loading state to false once fetching is complete
    setLoading(false);
  }
};
export { fetchPokemon, fetchSpecificPokemon };
