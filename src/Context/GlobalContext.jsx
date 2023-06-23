import { createContext, useEffect, useState } from "react";

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

  useEffect(() => {
    const pokemonsOnLocalStorage = JSON.parse(localStorage.getItem("pokemons"));
    pokemonsOnLocalStorage
      ? setPokedex(pokemonsOnLocalStorage)
      : setPokedex([]);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("pokemons", JSON.stringify(pokedex));
    }, 200);
  }, [pokedex]);

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
