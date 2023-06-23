import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/LogoPokemon.svg";
import menor from "../../assets/Menor.svg";
import { GlobalContext } from "../../Context/GlobalContext";
import { GoToPokedexPage, GoToPokemonList } from "../../Router/Coordinator";

import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
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

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pokedex, addPokedex, removePokemon, pokemonGlobal } =
    useContext(GlobalContext);
  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="5%"
      backdropBlur={"0.313rem"}
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayTwo />);
  function closeModal() {
    onClose();
    if (pokedex.find((pokemon) => pokemon.id === pokemonGlobal.id)) {
      removePokemon(pokemon.id);
    }
  }
  return (
    <Grid
      h={"10rem"}
      templateColumns={"repeat(32,1fr)"}
      alignItems={"center"}
      bgColor={"#ffffff"}
    >
      {location.pathname !== "/" && (
        <GridItem colStart={2} colEnd={7}>
          <Button
            bgColor={"transparent"}
            textDecoration={"underline"}
            fontWeight={"bolder"}
            fontSize={"2rem"}
            onClick={() => GoToPokemonList(navigate)}
          >
            <Image src={menor} alt="" />
            <Text>Todos Pokémons</Text>
          </Button>
        </GridItem>
      )}
      <GridItem colStart={14} colEnd={19}>
        <Image src={logo} alt="Logo Pokemon" />
      </GridItem>

      {location.pathname === "/" && (
        <GridItem colStart={26} colEnd={31}>
          <Button
            bgColor={"#33A4F5"}
            color={"white"}
            w={"19.938rem"}
            h={"4.625rem"}
            fontSize={"1.5rem"}
            onClick={() => GoToPokedexPage(navigate)}
          >
            Pokédex
          </Button>
        </GridItem>
      )}
      {location.pathname.includes("/details") &&
        (pokedex.find((pokemon) => pokemon.id === pokemonGlobal.id) ? (
          <GridItem colStart={27} colEnd={30}>
            <Button
              bgColor={"#FF6262"}
              color={"#FFFFFF"}
              onClick={() => (onOpen(), removePokemon(pokemonGlobal.id))}
            >
              Excluir da Pokédex
            </Button>
          </GridItem>
        ) : (
          <GridItem colStart={27} colEnd={30}>
            <Button
              bgColor={"#33A4F5"}
              color={"#FFFFFF"}
              onClick={() => (onOpen(), addPokedex(pokemonGlobal))}
            >
              Adicionar à Pokédex
            </Button>
          </GridItem>
        ))}
      <Modal isCentered isOpen={isOpen} onClose={closeModal}>
        {overlay}
        <ModalContent>
          <ModalHeader
            fontSize={"3rem"}
            fontFamily={"Poppins"}
            fontWeight={700}
            marginLeft={
              !pokedex.find((pokemon) => pokemon.id === pokemonGlobal.id)
                ? "25%"
                : "21%"
            }
          >
            {!pokedex.find((pokemon) => pokemon.id === pokemonGlobal.id)
              ? "Oh,no!"
              : "Gotcha!"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text marginLeft={"20%"}>
              {!pokedex.find((pokemon) => pokemon.id === pokemonGlobal.id)
                ? "O Pokémon foi removido da sua Pokédex"
                : "O Pokémon foi adicionado a sua Pokédex"}
            </Text>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Button onClick={closeModal}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Grid>
  );
};

export default Header;
