import { Button, Flex, Heading } from "@chakra-ui/react";
import Step1 from "@src/container/home/step1";
import Step2 from "@src/container/home/step2";
import { GlobalContext } from "@src/utils/context";
import { useContext } from "react";

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

    default:
      return (
        <Flex flexDir="column" alignItems="center" rowGap="30px" p="30px">
          <Heading as="h1">Sistem Pengambil Keputusan TOPSIS</Heading>

          <Button colorScheme="blue" width="fit-content" onClick={increaseStep}>
            Mulai
          </Button>
        </Flex>
      );
  }
}
