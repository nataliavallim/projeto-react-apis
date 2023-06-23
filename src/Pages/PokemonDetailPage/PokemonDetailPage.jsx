import { Box, Flex, Image, Progress, Text } from "@chakra-ui/react";
import pokebola from "../../assets/PokeballDetails.svg";
import pokebolabg from "../../assets/PokeballBgDetails.png";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { poke } from "../../Api/api";
import themes from "../../Utilidades/themes";
import types from "../../Utilidades/types";

const PokemonDetailPage = () => {
  const parametro = useParams();
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    poke
      .get(`/pokemon/${parametro.id}`)
      .then((response) => {
        setPokemon(response.data);
        setLoading(false);
      })
      .catch((error) => {});
  }, []);

  let movesCount = 0;
  if (loading) {
    return <p> carregando </p>;
  }

  let total = 0;
  if (!loading) {
    for (const stat of pokemon.stats) {
      total += stat.base_stat;
    }
  }
  return (
    <Box position={"relative"}>
      <Text
        fontSize={"3rem"}
        fontFamily={"Poppins"}
        position={"absolute"}
        color={"white"}
        marginTop={"3rem"}
        marginLeft={"8rem"}
        fontWeight={700}
      >
        Detalhes
      </Text>

      <Image
        position={"absolute"}
        w={"56.812rem"}
        h={"56.812rem"}
        top={"-3.125rem"}
        left={"50%"}
        transform={"translate(-50%)"}
        src={pokebolabg}
        alt=""
      />

      <Box
        position={"absolute"}
        w={"86.821rem"}
        h={"41.438rem"}
        left={"50%"}
        top={"11.75rem"}
        transform={"translate(-50%)"}
        bgColor={themes.colors.backgroundCard[pokemon.types[0].type.name]}
        borderRadius={"2.368rem"}
      >
        <Image
          position={"absolute"}
          top={0}
          right={0}
          h={"41.438rem"}
          src={pokebola}
          alt=""
        />

        <Image
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt=""
          zIndex={1}
          position={"absolute"}
          top={"-8.25rem"}
          left={"67.75rem"}
          h={"16.875rem"}
          w={"16.875rem"}
        />
        <Box
          position={"absolute"}
          bgColor={"white"}
          w={"17.625rem"}
          h={"17.625rem"}
          left={"2.75rem"}
          top={"1.625rem"}
          borderRadius={"0.5rem"}
          border={"0.125rem solid white"}
        >
          <Image src={pokemon.sprites.front_default} w={"18rem"} />
        </Box>

        <Box
          position={"absolute"}
          bgColor={"white"}
          w={"17.625rem"}
          h={"17.625rem"}
          left={"2.75rem"}
          top={"22.188rem"}
          borderRadius={"0.5rem"}
          border={"0.125rem solid white"}
        >
          <Image src={pokemon.sprites.back_default} w={"18rem"} />
        </Box>

        <Box
          position={"absolute"}
          bgColor={"white"}
          w={"21.438rem"}
          h={"38.313rem"}
          left={"22.5rem"}
          top={"1.5rem"}
          borderRadius={"0.75rem"}
        >
          <Text
            fontSize={"1.5rem"}
            marginLeft={"1rem"}
            fontFamily={"Inter"}
            fontWeight={700}
          >
            Base Stats:
          </Text>
          {pokemon.stats.map((stats) => {
            return (
              <>
                <Text textTransform={"capitalize"} marginLeft={"1rem"}>
                  {stats.stat.name} {stats.base_stat}{" "}
                </Text>
                <Progress
                  colorScheme={`hsl(${stats.base_stat * 0.8}, 80%, 50%)}`}
                  value={stats.base_stat}
                  borderRadius={"0.25rem"}
                  marginLeft={"0.25rem"}
                />
              </>
            );
          })}
          <Text marginLeft={"1rem"} fontFamily={"Inter"} fontWeight={700}>
            Total {total}
          </Text>
        </Box>

        <Box
          position={"absolute"}
          bgColor={"white"}
          w={"18.25rem"}
          h={"28.313rem"}
          left={"48.188rem"}
          top={"11.5rem"}
          borderRadius={"0.5rem"}
        >
          <Text
            fontSize={"1.5rem"}
            marginLeft={"1rem"}
            fontFamily={"Inter"}
            fontWeight={700}
          >
            Moves:
          </Text>
          {pokemon.moves.map((move) => {
            if (movesCount < 8) {
              movesCount++;
              return (
                <Text
                  alignItems={"flex-start"}
                  bgColor={"#ECECEC"}
                  border={"1px dashed rgba(0, 0, 0, 0.14)"}
                  borderRadius={"12px"}
                  w={"10rem"}
                  h={"2.313rem"}
                  textTransform={"capitalize"}
                  marginLeft={"1rem"}
                  marginBottom={"1rem"}
                  fontFamily={"Montserrat"}
                  paddingLeft={"0.625rem"}
                >
                  {move.move.name}
                </Text>
              );
            }
          })}
        </Box>

        <Text
          fontSize={"1rem"}
          fontFamily={"Inter"}
          position={"absolute"}
          top={"1.5rem"}
          left={"48.375rem"}
          color={"white"}
        >
          #{pokemon.id < 10 ? `0${pokemon.id}` : pokemon.id}
        </Text>

        <Text
          fontSize={"3rem"}
          fontFamily={"Inter"}
          position={"absolute"}
          top={"2.438rem"}
          left={"48.188rem"}
          color={"white"}
          textTransform={"capitalize"}
        >
          {pokemon.name}
        </Text>

        <Flex
          gap={"0.3rem"}
          position={"absolute"}
          left={"48.375rem"}
          top={"6.625rem"}
        >
          {pokemon.types.map((type, i) => {
            return <Image key={i} src={types[type.type.name]} />;
          })}
        </Flex>
      </Box>
    </Box>
  );
};

export default PokemonDetailPage;
