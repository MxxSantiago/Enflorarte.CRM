import { useEffect, useState, useCallback } from "react";
import { Table, TableContainer, Card } from "@chakra-ui/react";
import { getAllEntities } from "../../../../core/helpers/web-api-client.helper.ts";
import EntitiesTableBody from "./EntitiesTableBody.jsx";
import EntitiesTableHeader from "./EntitiesTableHeader.jsx";
import EntitiesTableFooter from "./EntitiesTableFooter.jsx";

const paginate = (items, currentPage, itemsPerPage) => {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return items.slice(start, end);
};

const EntitiesTable = ({
  entityName,
  refreshView,
  lastUpdated,
  entity,
  fatherEntityName,
}) => {
  const [allItems, setAllItems] = useState([]);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [fatherEntityData, setFatherEntityData] = useState([]);

  useEffect(() => {
    populateAllItems();
    if (fatherEntityName) {
      populateFatherItems();
    }
  }, [lastUpdated]);

  useEffect(() => {
    setItems(paginate(allItems, currentPage, itemsPerPage));
  }, [currentPage, allItems]);

  const populateAllItems = async () => {
    setAllItems(await getAllEntities(entityName));
  };

  const populateFatherItems = async () =>
    setFatherEntityData(await getAllEntities(fatherEntityName));

  const totalPages = Math.ceil(allItems.length / itemsPerPage);

  const changePage = useCallback(
    (newPage) => {
      if (newPage > 0 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    },
    [totalPages]
  );

  return (
    <Card
      overflowX="auto"
      maxW={{ base: "100%", md: "700px" }}
      variant="outline"
    >
      <TableContainer>
        <Table variant="striped" colorScheme="pink">
          <EntitiesTableHeader entity={entity} />
          <EntitiesTableBody
            items={items}
            entityName={entityName}
            refreshView={refreshView}
            lastUpdated={lastUpdated}
            fatherEntityName={fatherEntityName}
            fatherEntityData={fatherEntityData}
          />
          <EntitiesTableFooter
            totalPages={totalPages}
            totalItems={allItems.length}
            currentPage={currentPage}
            changePage={changePage}
            entityName={entityName}
          />
        </Table>
      </TableContainer>
    </Card>
  );
};

export default EntitiesTable;
