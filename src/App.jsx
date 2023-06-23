import "./App.css";
import GlobalStyle from "./GlobalStyle";
import Header from "./Components/Header/Header";
import PokemonListPage from "./Pages/PokemonListPage/PokemonListPage";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RouterPage } from "./Router/Router";
import ComponentsGlobalContext from "./Context/GlobalContext";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bgColor: "#5E5E5E",
      },
    },
  },
});
function App() {
  return (
    <ComponentsGlobalContext>
      <ChakraProvider theme={theme}>
        <GlobalStyle />
        <RouterPage />
      </ChakraProvider>
    </ComponentsGlobalContext>
  );
}

export default App;
