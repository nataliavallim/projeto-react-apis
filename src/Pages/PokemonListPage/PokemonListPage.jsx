import { Button, Center, Container, Flex, Grid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { poke } from "../../Api/api";
import { LoadingPage } from "../../Components/LoadingPage/LoadingPage";
import PokemonCard from "../../Components/PokemonCard/PokemonCard";

const PokemonListPage = () => {
  const [pokedata, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [previous, setPrevious] = useState(true);
  const [next, setNext] = useState(true);
  useEffect(() => {
    poke
      .get("pokemon", {
        params: {
          limit: 30,
          offset: page * 30,
        },
      })
      .then((response) => {
        setPrevious(response.data.previous);
        setNext(response.data.next);
        Promise.all(
          response.data.results.map((result) => poke.get(result.url))
        ).then((resp) => {
          setPokeData(resp.map((pokemon) => pokemon.data));
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);
  console.log(previous, next);
  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <Text
            h={"4.5rem"}
            fontSize={"3rem"}
            fontFamily={"Poppins"}
            marginTop={"3rem"}
            marginLeft={"6rem"}
            color={"white"}
            fontWeight={700}
          >
            Todos Pokémons
          </Text>
          <Grid templateColumns={"repeat(3,1fr)"} justifyItems={"center"}>
            {pokedata.map((pokemon) => {
              return <PokemonCard key={pokemon.id} pokemon={pokemon} />;
            })}
          </Grid>
          <Flex
            m={"2rem 0 2rem 50%"}
            gap={"1rem"}
            transform={"translate(-50%)"}
            w={"fit-content"}
          >
            <Button
              fontWeight={400}
              fontSize={"1rem"}
              fontFamily={"Poppins"}
              hidden={!previous}
              previous={previous}
              onClick={() => setPage(page - 1)}
            >
              Anterior
            </Button>
            <Button
              fontWeight={400}
              fontSize={"1rem"}
              fontFamily={"Poppins"}
              hidden={!next}
              onClick={() => setPage(page + 1)}
            >
              Próximo
            </Button>
          </Flex>
        </>
      )}
    </>
  );
};

export default PokemonListPage;
