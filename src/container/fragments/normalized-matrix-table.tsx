import {
  Box,
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Alternatif } from "@src/global";
import { GlobalContext } from "@src/utils/context";
import {
  dividerNormalizedMatrix,
  getIdealNegativeValue,
  getIdealPositiveValue,
  getNormalizedValue,
  getNormalizedWeightValue,
  getPreferences,
  getRangeIdealNegative,
  getRangeIdealPositive,
} from "@src/utils/formula";
import { useContext, useEffect } from "react";

export const NormalizedMatrixTable = () => {
  const { state, dispatch }: any = useContext(GlobalContext);

  useEffect(() => {
    const dividerValue = dividerNormalizedMatrix(state.alternative);
    const normalizedValue = getNormalizedValue(dividerValue);
    const normalizedWeightValue = getNormalizedWeightValue(normalizedValue);
    const positiveIdealValue = getIdealPositiveValue(normalizedWeightValue);
    const negativeIdealValue = getIdealNegativeValue(positiveIdealValue);
    const rangeIdealPositive = getRangeIdealPositive(negativeIdealValue);
    const rangeIdealNegative = getRangeIdealNegative(rangeIdealPositive);
    const preferences = getPreferences(rangeIdealNegative);
    dispatch({ type: "CHANGE_ALTERNATIVE", payload: preferences });
  }, []);

  return (
    <Box my="40px">
      <Heading as="h1" size="xl">
        Matrix Ternormalisasi
      </Heading>

      <TableContainer mt="50px">
        <Table variant="simple">
          <Thead border={1}>
            <Tr>
              <Th>No</Th>
              <Th>Nama Alternatif</Th>
              {state.criteria.map(({ name }: any) => (
                <Th>{name}</Th>
              ))}
            </Tr>
          </Thead>

          <Tbody>
            {state.alternative.map(
              ({ name, value }: Alternatif, aIndex: number) => (
                <Tr key={aIndex}>
                  <Td>{aIndex + 1}</Td>
                  <Td>{name}</Td>
                  {value.map((v: any, vIndex: number) => (
                    <Td key={vIndex}>
                      <Input
                        placeholder=" nilai"
                        value={v.normalizedValue}
                        readOnly
                      />
                    </Td>
                  ))}
                </Tr>
              )
            )}
          </Tbody>

          <Tfoot>
            <Tr>
              <Td fontWeight={600}>Pembagi</Td>
              <Td></Td>
              {state.criteria.map(({ name }: any, index: number) => (
                <Td fontWeight={600}>
                  {state.alternative[0].value[index].divider}
                </Td>
              ))}
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
};
