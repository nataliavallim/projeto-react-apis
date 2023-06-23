import pokebola from "../../assets/Pokebola.svg";
import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { GoToDetailPage } from "../../Router/Coordinator";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import types from "../../Utilidades/types";
import themes from "../../Utilidades/themes";
import { GlobalContext } from "../../Context/GlobalContext";
import { useContext, useState } from "react";

const PokemonCard = ({ pokemon }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addPokedex, removePokemon, pokedex, setPokemonGlobal } =
    useContext(GlobalContext);
  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="5%"
      backdropBlur="2px"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayTwo />);
  function closeModal() {
    onClose();
    if (location.pathname === "/pokedex") {
      removePokemon(pokemon.id);
    }
  }
  return (
    <>
      <Flex
        h={"16.438rem"}
        w={"27.5rem"}
        alignItems={"flex-end"}
        position={"relative"}
      >
        <Image
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt=""
          zIndex={1}
          position={"absolute"}
          top={0}
          right={0}
          w={"12.063rem"}
          h={"12.063rem"}
        />
        <Box
          color={"white"}
          position={"relative"}
          h={"13.125rem"}
          w={"27.5rem"}
          bgColor={themes.colors.backgroundCard[pokemon.types[0].type.name]}
          borderRadius={"0.75rem"}
        >
          <Text
            fontSize={"1rem"}
            fontFamily={"Inter"}
            position={"absolute"}
            top={"1.563rem"}
            left={"1.438rem"}
          >
            #{pokemon.id < 10 ? `0${pokemon.id}` : pokemon.id}
          </Text>
          <Text
            fontSize={"2rem"}
            fontFamily={"Inter"}
            position={"absolute"}
            top={"2.5rem"}
            left={"1.438rem"}
            textTransform={"capitalize"}
          >
            {pokemon.name}
          </Text>
          <Flex
            gap={"0.3rem"}
            position={"absolute"}
            left={"1.438rem"}
            top={"5.563rem"}
          >
            {pokemon.types.map((type, i) => {
              return <Image key={i} src={types[type.type.name]} />;
            })}
          </Flex>
          <Button
            fontWeight={700}
            position={"absolute"}
            left={"1.438rem"}
            bottom={"1.25rem"}
            bgColor={"transparent"}
            color={"white"}
            border={"none"}
            _hover={"none"}
            _active={"none"}
            zIndex={2}
            onClick={() => (
              setPokemonGlobal(pokemon), GoToDetailPage(navigate, pokemon.id)
            )}
          >
            <u>Detalhes</u>
          </Button>

          <Image
            position={"absolute"}
            top={0}
            right={0}
            src={pokebola}
            alt=""
          />

          <Button
            w={"9.125rem"}
            h={"2.375rem"}
            fontWeight={400}
            position={"absolute"}
            right={"1.375rem"}
            bottom={"1.25rem"}
            fontSize={"1rem"}
            fontFamily={"Poppins"}
            bgColor={location.pathname === "/pokedex" ? "#FF6262" : "#FFFFFF"}
            color={location.pathname === "/pokedex" ? "#FFFFFF" : "#0F0F0F"}
            hidden={
              location.pathname === "/" &&
              pokedex.find((p) => p.id === pokemon.id)
            }
            onClick={() => (
              onOpen(),
              location.pathname === "/pokedex" ? "" : addPokedex(pokemon)
            )}
          >
            {location.pathname === "/pokedex" ? "Remover" : "Capturar!"}
          </Button>
        </Box>
      </Flex>

      <Modal isCentered isOpen={isOpen} onClose={closeModal}>
        {overlay}
        <ModalContent>
          <ModalHeader
            fontFamily={"Poppins"}
            fontWeight={700}
            fontSize={"3rem"}
            marginLeft={location.pathname === "/pokedex" ? "25%" : "21%"}
          >
            {location.pathname === "/pokedex" ? "Oh,no!" : "Gotcha!"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text marginLeft={"14%"}>
              {location.pathname === "/pokedex"
                ? "O Pokémon foi removido da sua Pokédex"
                : "O Pokémon foi adicionado a sua Pokédex"}
            </Text>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Button onClick={closeModal}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PokemonCard;
