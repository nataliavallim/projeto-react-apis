import { Container, Image } from "@chakra-ui/react";
import loadinggif from "../../assets/pikachugif.gif";

export const LoadingPage = () => {
  return (
    <Container centerContent>
      <Image w={"10rem"} src={loadinggif} alt="" />
    </Container>
  );
};
