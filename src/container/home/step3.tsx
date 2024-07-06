import {
  Button,
  Container,
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { NegativeIdealValue } from "@src/container/fragments/negative-ideal-value";
import { NormalizedMatrixTable } from "@src/container/fragments/normalized-matrix-table";
import { NormalizedMatrixWithWeightTable } from "@src/container/fragments/normalized-matrix-with-weight";
import { PositiveIdealValue } from "@src/container/fragments/positive-ideal-value";
import { Preferences } from "@src/container/fragments/preferences";
import { RangeNegativeIdeal } from "@src/container/fragments/range-ideal-negative";
import { RangePositiveIdeal } from "@src/container/fragments/range-ideal-positive";
import { Ranking } from "@src/container/fragments/ranking";
import { Alternatif } from "@src/global";
import { GlobalContext } from "@src/utils/context";

import { useContext, useState } from "react";

export default function Step3() {
  const { state, dispatch }: any = useContext(GlobalContext);
  const [currentA, setCurrentA] = useState<Alternatif[]>(state.alternative);
  const [isProceed, setIsProceed] = useState<boolean>(false);

  const handleChangeValue = (aIndex: number, vIndex: number, value: any) => {
    // Create a copy of the current alternatives array
    const newAlternatives = [...currentA];

    // Create a copy of the specific alternative's value array
    const newValueArray = [...newAlternatives[aIndex].value];

    // Update the specific value in the copy of the value array
    newValueArray[vIndex] = { ...newValueArray[vIndex], value };

    // Update the value array in the copy of the alternative
    newAlternatives[aIndex] = {
      ...newAlternatives[aIndex],
      value: newValueArray,
    };

    // Set the updated alternatives array as the new state
    setCurrentA(newAlternatives);
  };

  const onProceed = () => {
    dispatch({ type: "CHANGE_ALTERNATIVE", payload: currentA });
    setIsProceed(true);
  };

  return (
    <Container maxW={1200} mx="auto" py="20px">
      <Heading as="h1">Masukkan Alternatif</Heading>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Nama Alternatif</Th>
              {state.criteria.map(({ name }: any, index: number) => (
                <Th key={index}>{name}</Th>
              ))}
            </Tr>
          </Thead>

          <Tbody>
            {currentA.map(({ name, value }: Alternatif, aIndex) => (
              <Tr key={aIndex}>
                <Td>{aIndex + 1}</Td>
                <Td>{name}</Td>
                {value.map((v: any, vIndex: number) => (
                  <Td key={vIndex}>
                    <Input
                      width="90px"
                      placeholder="nilai"
                      value={v.value}
                      onChange={({ target: { value } }) =>
                        handleChangeValue(aIndex, vIndex, value)
                      }
                    />
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {isProceed && (
        <>
          <NormalizedMatrixTable />
          <NormalizedMatrixWithWeightTable />
          <PositiveIdealValue />
          <NegativeIdealValue />
          <RangePositiveIdeal />
          <RangeNegativeIdeal />
          <Preferences />
          <Ranking />
        </>
      )}
      <Button mt="50px" colorScheme="teal" onClick={onProceed}>
        Proceed
      </Button>
    </Container>
  );
}
