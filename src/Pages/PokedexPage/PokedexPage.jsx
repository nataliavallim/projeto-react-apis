import { Box, Grid, Text } from "@chakra-ui/react";
import { useContext } from "react";
import PokemonCard from "../../Components/PokemonCard/PokemonCard";
import { GlobalContext } from "../../Context/GlobalContext";

const PokedexPage = () => {
  const { pokedex } = useContext(GlobalContext);
  return (
    <Box>
      <Text
        h={"4.5rem"}
        fontSize={"3rem"}
        fontFamily={"Poppins"}
        marginTop={"3rem"}
        marginLeft={"6rem"}
        color={"white"}
        fontWeight={700}
      >
        Meus Pokémons
      </Text>
      <Grid templateColumns={"repeat(3,1fr)"} justifyItems={"center"}>
        {pokedex.map((pokemon) => {
          return <PokemonCard key={pokemon.id} pokemon={pokemon} />;
        })}
      </Grid>
    </Box>
  );
};

export default PokedexPage;
