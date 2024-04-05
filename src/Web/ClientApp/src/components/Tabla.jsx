import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import { getAllEntities } from "../helpers/selectClient.ts";
import TableItem from "./TableItem.jsx";

function Tabla({ entityName }) {
  const [data, setData] = useState({ items: [], loading: true });

  useEffect(() => {
    populateItems();
  }, [entityName]);

  const populateItems = async () => {
    const data = await getAllEntities(entityName);
    setData({ items: data, loading: false });
  };

  return (
    <Box overflowX="auto">
      <TableContainer
        width={{ base: "100%", md: "550px" }}
        bg="white"
        borderRadius="md"
      >
        <Table variant="striped" colorScheme="pink">
          <Thead>
            <Tr>
              <Th>Nombre {entityName}</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.items.map((item) => (
              <TableItem key={item.id} item={item} entityName={entityName} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Tabla;
