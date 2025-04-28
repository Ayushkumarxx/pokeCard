import React from "react";
import typeStyles from "../utils/typeStyle";

/**
 * TypeBadge Component
 * 
 * This component renders a badge for a Pokémon type, with an animated hover effect.
 * 
 * Props:
 * - type (string): The type of the Pokémon to be displayed as a badge.
 * 
 * @param {string} type - The Pokémon type to be displayed in the badge.
 * @returns {JSX.Element} - A JSX element displaying a Pokémon type badge with animation.
 */
const TypeBadge = ({ type }) => {
  const style = typeStyles[type] || { color: '#CCCCCC', gradient: 'linear-gradient(135deg, #CCCCCC, #999999)' };

  return (
    <span 
      className="inline-block px-4 py-1 rounded-full text-xs font-bold text-white capitalize mr-2 transition-all duration-300 hover:scale-110 hover:shadow-lg"
      style={{ background: style.gradient }}
    >
      {type}
    </span>
  );
};

/**
 * StatBar Component
 * 
 * This component displays a stat bar with an animation indicating a Pokémon's stat value.
 * 
 * Props:
 * - label (string): The label for the stat (e.g., "HP", "ATK").
 * - value (number): The value of the stat.
 * - maxValue (number, optional): The maximum value for the stat (default is 200).
 * - color (string): The color of the stat bar (e.g., "#FF5959").
 * 
 * @param {string} label - The stat's label (e.g., "HP").
 * @param {number} value - The stat value to be displayed.
 * @param {number} maxValue - The maximum value for the stat.
 * @param {string} color - The color of the stat bar.
 * @returns {JSX.Element} - A JSX element displaying a stat bar with animation.
 */
const StatBar = ({ label, value, maxValue = 200, color }) => {
  const percentage = Math.min(100, (value / maxValue) * 100);

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-bold uppercase text-gray-300">{label}</span>
        <span className="text-xs font-bold text-white">{value}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
        <div 
          className="h-2.5 rounded-full animate-expand" 
          style={{ 
            width: `${percentage}%`, 
            backgroundColor: color,
            animation: 'expandWidth 1.5s ease-out'
          }}
        ></div>
      </div>
    </div>
  );
};

/**
 * PokemonCard Component
 * 
 * This component displays a Pokémon's details in a card layout, including its types, image, and stats.
 * It includes various animations for visual effects.
 * 
 * Props:
 * - pokemon (object): The Pokémon object containing its name, id, types, stats, and image.
 * 
 * @param {object} pokemon - The Pokémon object containing all relevant details.
 * @returns {JSX.Element} - A JSX element displaying the Pokémon's card.
 */
const PokemonCard = ({ pokemon }) => {
  const primaryType = pokemon.types[0];
  const style = typeStyles[primaryType] || { color: '#CCCCCC', gradient: 'linear-gradient(135deg, #CCCCCC, #999999)' };

  return (
    <div 
      className="rounded-2xl overflow-hidden shadow-md transform hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl animate-fadeIn"
      style={{ 
        animation: 'fadeIn 0.6s ease-out',
        // boxShadow: `0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px ${style.color}40`,
        background: `radial-gradient(circle, ${style.color}30, ${style.color}10)`
      }}
    
    >
      {/* Gradient Header */}
      <div 
        className="h-1.5"
        style={{ background: style.gradient }}
      ></div>
      
      <div className="p-5">
        {/* Pokémon Name and ID */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white capitalize">{pokemon.name}</h2>
          <div className="text-sm font-mono font-bold text-gray-400">#{pokemon.id.toString().padStart(3, '0')}</div>
        </div>
        
        {/* Pokémon Image with Animation */}
        <div 
          className="rounded-xl p-6 mb-4 flex justify-center items-center overflow-hidden bg-opacity-10"
          style={{ 
            background: `radial-gradient(circle, ${style.color}30, ${style.color}10)` 
          }}
        >
          <img 
            src={pokemon.image} 
            alt={pokemon.name} 
            className="w-36 h-36 object-contain transform hover:scale-110 transition duration-500 drop-shadow-lg animate-float"
            style={{ animation: 'float 3s ease-in-out infinite' }}
          />
        </div>
        
        {/* Pokémon Types */}
        <div className="mb-4">
          {pokemon.types.map(type => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
        
        {/* Pokémon Stats */}
        <div className="mt-5">
          <StatBar label="HP" value={pokemon.stats.hp} color="#FF5959" />
          <StatBar label="ATK" value={pokemon.stats.attack} color="#F5AC78" />
          <StatBar label="DEF" value={pokemon.stats.defense} color="#FAE078" />
          <StatBar label="SPD" value={pokemon.stats.speed} color="#FA92B2" />
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
