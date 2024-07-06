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
import { Alternatif } from "@src/global";
import { GlobalContext } from "@src/utils/context";
import { useContext } from "react";

export const NormalizedMatrixWithWeightTable = () => {
  const { state }: any = useContext(GlobalContext);

  return (
    <Box my="40px">
      <Heading as="h1" size="xl">
        Matrix Keputusan Ternormalisasi
      </Heading>

      <TableContainer mt="50px">
        <Table variant="simple">
          <Thead>
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
                        // width="90px"
                        placeholder=" nilai"
                        value={v.normalizedWeightValue}
                        readOnly
                      />
                    </Td>
                  ))}
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
