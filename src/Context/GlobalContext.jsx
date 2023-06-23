import { createContext, useState } from "react";

export const GlobalContext = createContext();
const ComponentsGlobalContext = ({ children }) => {
  const [pokedex, setPokedex] = useState([]);
  const [pokemonGlobal, setPokemonGlobal] = useState({});
  function addPokedex(pokemon) {
    setPokedex([...pokedex, pokemon]);
  }
  function removePokemon(id) {
    setPokedex(pokedex.filter((p) => p.id !== id));
  }
  return (
    <GlobalContext.Provider
      value={{
        pokedex,
        addPokedex,
        removePokemon,
        pokemonGlobal,
        setPokemonGlobal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default ComponentsGlobalContext;
