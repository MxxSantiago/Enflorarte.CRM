import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Card,
} from "@chakra-ui/react";
import {
  getAllEntities,
  removeReferenceIdProperties,
} from "../helpers/web-api-client.helper.ts";
import TableItem from "./TableItem.jsx";

function EntitiesTable({ entityName, refreshView, lastUpdated, entity }) {
  const [items, setData] = useState([]);

  useEffect(() => {
    populateItems();
  }, [lastUpdated]);

  const populateItems = async () => {
    const data = await getAllEntities(entityName);
    setData(data);
  };

  return (
    <Card
      borderRadius="lg"
      overflowX="auto"
      maxW={{ base: "100%", md: "700px" }}
    >
      <TableContainer>
        <Table variant="striped" colorScheme="pink">
          <Thead>
            <Tr>
              {Object.keys(removeReferenceIdProperties(entity))
                .filter((key) => key.indexOf("id") === -1)
                .map((key) => (
                  <Th key={key}>{key}</Th>
                ))}
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item) => (
              <TableItem
                lastUpdated={lastUpdated}
                key={item.id}
                item={item}
                entityName={entityName}
                refreshView={refreshView}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default EntitiesTable;
