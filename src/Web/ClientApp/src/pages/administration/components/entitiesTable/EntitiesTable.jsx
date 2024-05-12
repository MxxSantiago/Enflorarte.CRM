import { useEffect, useState, useCallback } from "react";
import { Table, TableContainer, Card } from "@chakra-ui/react";
import EntitiesTableBody from "./EntitiesTableBody.jsx";
import EntitiesTableHeader from "./EntitiesTableHeader.jsx";
import EntitiesTableFooter from "./EntitiesTableFooter.jsx";

const paginate = (items, currentPage, itemsPerPage) => {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return items.slice(start, end);
};

const itemsPerPage = 5;

const EntitiesTable = ({
  entity,
  entityName,
  fatherEntityName,
  entitiesData,
  fatherEntityData,
  refetch,
}) => {
  const [paginatedEntities, setPaginatedEntities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setPaginatedEntities(paginate(entitiesData, currentPage, itemsPerPage));
  }, [currentPage, entitiesData]);

  const totalPages = Math.ceil(entitiesData.length / itemsPerPage);

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
            items={paginatedEntities}
            entityName={entityName}
            fatherEntityName={fatherEntityName}
            fatherEntityData={fatherEntityData}
            refetch={refetch}
          />
          <EntitiesTableFooter
            totalPages={totalPages}
            totalItems={entitiesData.length}
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
