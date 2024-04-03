import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Box,
} from "@chakra-ui/react";
import BotonEditar from "./BotonEditar";
import BotonEliminar from "./BotonEliminar";
import { getAllEntities } from "../../helpers/selectClient.ts";

function Tabla({ toEdit, entityName }) {
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
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td>
                  <Flex justifyContent="flex-end" gap="10px">
                    <BotonEditar texto={"Editar"} to={`${toEdit}/${item.id}`} />
                    <BotonEliminar texto={"Eliminar"} id={item.id} />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Tabla;
