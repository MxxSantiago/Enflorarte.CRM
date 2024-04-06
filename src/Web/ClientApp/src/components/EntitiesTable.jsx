import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Card,
  Button,
  Box,
} from "@chakra-ui/react";
import {
  getAllEntities,
  removeReferenceIdProperties,
} from "../helpers/web-api-client.helper.ts";
import TableItem from "./TableItem.jsx";
import { LANG } from "../helpers/es.ts";

function EntitiesTable({
  entityName,
  refreshView,
  lastUpdated,
  entity,
  fatherEntityName,
}) {
  const [items, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    populateItems();
  }, [lastUpdated, currentPage]);

  const populateItems = async () => {
    const data = await getAllEntities(entityName);
    const paginatedData = data.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    setData(paginatedData);
    setTotalItems(data.length);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const changePage = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
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
                .filter((key) => key.toLowerCase().indexOf("id") === -1)
                .map((key) => (
                  <Th key={key}>{LANG(key)}</Th>
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
                fatherEntityName={fatherEntityName}
                refreshView={refreshView}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Box ml={4} mt={4} mb={3}>
        <Button
          onClick={() => changePage(currentPage - 1)}
          mr={2}
          disabled={currentPage === 1}
        >
          {"<"}
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <Button
              key={pageNumber}
              onClick={() => changePage(pageNumber)}
              colorScheme={pageNumber === currentPage ? "pink" : "gray"}
              mr={2}
            >
              {pageNumber}
            </Button>
          )
        )}
        <Button
          onClick={() => changePage(currentPage + 1)}
          mr={2}
          disabled={currentPage === totalPages}
        >
          {">"}
        </Button>
      </Box>
    </Card>
  );
}

export default EntitiesTable;
