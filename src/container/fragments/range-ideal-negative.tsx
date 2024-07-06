import {
  Box,
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
import { GlobalContext } from "@src/utils/context";
import { useContext } from "react";

export const RangeNegativeIdeal = () => {
  const { state }: any = useContext(GlobalContext);

  return (
    <Box my="40px">
      <Heading as="h1" size="xl">
        Jarak Ideal Positif
      </Heading>

      <TableContainer mt="50px">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Tipe</Th>

              {state.alternative.map(({ name }: any) => (
                <Th>{name}</Th>
              ))}
            </Tr>
          </Thead>

          <Tbody>
            <Tr>
              <Td>1</Td>

              {state.alternative.map((a: any, vIndex: number) => (
                <Td key={vIndex}>
                  <Input
                    // width="90px"
                    placeholder=" nilai"
                    value={a.rangeIdealNegative}
                    readOnly
                  />
                </Td>
              ))}
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
