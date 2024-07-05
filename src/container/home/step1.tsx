import {
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";
import { Kriteria } from "@src/global";
import { GlobalContext } from "@src/utils/context";

import { useContext, useState } from "react";

export default function Step1() {
  const { state, dispatch }: any = useContext(GlobalContext);

  const [name, setName] = useState<string>("");
  const [type, setType] = useState<"benefit" | "cost">("benefit");
  const [cWeight, setCWeight] = useState<number>(0);
  const [currentC, setCurrentC] = useState<Kriteria[]>(state.criteria || []);

  const onChangeName = ({ target: { value } }: any) => {
    setName(value);
  };
  const onChangeType = ({ target: { value } }: any) => {
    setType(value);
  };
  const onChangeValue = ({ target: { value } }: any) => {
    setCWeight(value);
  };

  const onAdd = () => {
    const result: Kriteria = {
      type: type,
      weight: cWeight,
      name: name,
      value: 0,
    };

    setCurrentC((c) => [...c, result]);
    setName("");
    setType("benefit");
    setCWeight(0);
  };

  const onNext = () => {
    dispatch({
      type: "CHANGE_CRITERIA",
      payload: currentC,
    });

    dispatch({
      type: "CHANGE_STEP",
      payload: state.step + 1,
    });
  };

  return (
    <Container maxW={1200} mx="auto" py="20px">
      <Heading as="h1">Masukkan Kriteria</Heading>
      {currentC?.map(({ name, type, value }) => (
        <Flex columnGap="20px" mt="12px">
          <Input
            type="text"
            placeholder="masukkan nama kriteria"
            onChange={onChangeName}
            disabled
            value={name}
          />
          <Select
            placeholder="masukkan type"
            disabled
            value={type}
            onChange={onChangeType}
          >
            <option value="benefit">benefit</option>
            <option value="cost">cost</option>
          </Select>
          <Select
            placeholder="masukkan Bobot"
            disabled
            value={value}
            onChange={onChangeValue}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Select>

          <Button width="fit-content" colorScheme="red">
            -
          </Button>
        </Flex>
      ))}

      <Flex columnGap="20px" mt="12px">
        <Input
          type="text"
          placeholder="masukkan nama kriteria"
          onChange={onChangeName}
        />
        <Select placeholder="masukkan type" onChange={onChangeType}>
          <option value="benefit">benefit</option>
          <option value="cost">cost</option>
        </Select>
        <Select placeholder="masukkan Bobot" onChange={onChangeValue}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Select>

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
