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

export const Ranking = () => {
  const { state }: any = useContext(GlobalContext);

  return (
    <Box my="40px">
      <Heading as="h1" size="xl">
        Ranking
      </Heading>

      <TableContainer mt="50px">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>No</Th>

              <Th>Nama Alternatif</Th>
            </Tr>
          </Thead>

          <Tbody>
            {state.alternative
              .slice() // Salin array untuk menghindari perubahan mutasi
              .sort((a: any, b: any) => b.preferences - a.preferences)
              .map((a: Alternatif, index: number) => (
                <Tr>
                  <Td>{index + 1}</Td>
                  <Td>{a.name}</Td>
                  <Td>
                    <Input
                      // width="90px"
                      placeholder=" nilai"
                      value={a.preferences}
                      readOnly
                    />
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
