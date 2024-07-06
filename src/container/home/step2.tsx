import { Button, Container, Flex, Heading, Input } from "@chakra-ui/react";
import { Alternatif } from "@src/global";
import { GlobalContext } from "@src/utils/context";

import { useContext, useState } from "react";

export default function Step2() {
  const { state, dispatch }: any = useContext(GlobalContext);

  const [name, setName] = useState<string>("");

  const [currentA, setCurrentA] = useState<Alternatif[]>(
    state.alternative || []
  );

  const onChangeName = ({ target: { value } }: any) => {
    setName(value);
  };

  const onAdd = () => {
    const result: Alternatif = {
      name: name,
      value: state.criteria,
    };

    console.log(result);

    setCurrentA((a) => [...a, result]);
    setName("");
  };

  const onNext = () => {
    dispatch({ type: "CHANGE_ALTERNATIVE", payload: currentA });
    dispatch({ type: "CHANGE_STEP", payload: state.step + 1 });
  };

  return (
    <Container maxW={1200} mx="auto" py="20px">
      <Heading as="h1">Masukkan Alternatif</Heading>

      {currentA.map(({ name }) => (
        <Flex columnGap="20px" mt="12px">
          <Input
            type="text"
            placeholder="masukkan nama Alternatif"
            onChange={onChangeName}
            value={name}
            disabled
          />

          <Button width="fit-content" colorScheme="red" onClick={onAdd}>
            -
          </Button>
        </Flex>
      ))}

      <Flex columnGap="20px" mt="12px">
        <Input
          type="text"
          placeholder="masukkan nama Alternatif"
          onChange={onChangeName}
        />

        <Button width="fit-content" onClick={onAdd}>
          +
        </Button>
      </Flex>

      <Button mt="50px" colorScheme="teal" onClick={onNext}>
        Next
      </Button>
    </Container>
  );
}
