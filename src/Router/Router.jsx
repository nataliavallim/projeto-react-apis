import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../Components/Header/Header";
import PokedexPage from "../Pages/PokedexPage/PokedexPage";
import PokemonDetailPage from "../Pages/PokemonDetailPage/PokemonDetailPage";
import PokemonListPage from "../Pages/PokemonListPage/PokemonListPage";

export function RouterPage() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<PokemonListPage />} />
        <Route path="/pokedex" element={<PokedexPage />} />
        <Route path="/details/:id" element={<PokemonDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
