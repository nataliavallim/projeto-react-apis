export function GoToPokemonList(navigate) {
  navigate("/");
}

export function GoToPokedexPage(navigate) {
  navigate("/pokedex");
}

export function GoToDetailPage(navigate, id) {
  navigate("/details/" + id);
}
