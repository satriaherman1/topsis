import { Button, Flex, Heading } from "@chakra-ui/react";
import Step1 from "@src/container/home/step1";
import Step2 from "@src/container/home/step2";
import Step3 from "@src/container/home/step3";
import { GlobalContext } from "@src/utils/context";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const { state, dispatch }: any = useContext(GlobalContext);

  const increaseStep = () => {
    dispatch({
      type: "CHANGE_STEP",
      payload: state.step + 1,
    });
  };

  const pageStep = state.step;

  switch (pageStep) {
    case 1:
      return <Step1 />;

    case 2:
      return <Step2 />;

    case 3:
      return <Step3 />;

    default:
      return (
        <Flex
          maxW={500}
          flexDir="column"
          alignItems="center"
          rowGap="30px"
          p="30px"
          mx="auto"
          textAlign="center"
        >
          <Heading as="h1">Sistem Pengambil Keputusan TOPSIS</Heading>

          <Button colorScheme="blue" width="100%" onClick={increaseStep}>
            Mulai
          </Button>

          <Link
            style={{
              width: "100%",
            }}
            to="https://linkedin.com/in/muhammad-satria-herman"
          >
            <Button width="100%">Lihat Profil</Button>
          </Link>
        </Flex>
      );
  }
}
