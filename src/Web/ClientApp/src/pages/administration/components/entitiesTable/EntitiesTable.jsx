import { useEffect, useState, useCallback } from "react";
import { Table, TableContainer, Card, Skeleton, Box } from "@chakra-ui/react";
import EntitiesTableBody from "./EntitiesTableBody.jsx";
import EntitiesTableHeader from "./EntitiesTableHeader.jsx";
import EntitiesTableFooter from "./EntitiesTableFooter.jsx";
import { primaryColorScheme } from "../../../../core/constants.ts";

const paginate = (items, currentPage, itemsPerPage) => {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return items.slice(start, end);
};

const itemsPerPage = 30;

const EntitiesTable = ({
  entity,
  entityName,
  fatherEntityName,
  entitiesData,
  fatherEntityData,
  refetch,
  isLoading,
  ...props
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
      variant="outline"
      display="grid"
      gridTemplateRows="calc(100% - 60px) 60px"
      overflow="hidden"
      width="100%"
      {...props}
    >
      <Box overflowY="auto">
        <Skeleton isLoaded={!isLoading} height="100%" fadeDuration={1}>
          <TableContainer overflowX="unset" overflowY="unset">
            <Table variant="striped" colorScheme={primaryColorScheme}>
              <EntitiesTableHeader entity={entity} />
              <EntitiesTableBody
                items={paginatedEntities}
                entityName={entityName}
                fatherEntityName={fatherEntityName}
                fatherEntityData={fatherEntityData}
                refetch={refetch}
              />
            </Table>
          </TableContainer>
        </Skeleton>
      </Box>
      <EntitiesTableFooter
        totalPages={totalPages}
        totalItems={entitiesData.length}
        currentPage={currentPage}
        changePage={changePage}
        entityName={entityName}
      />
    </Card>
  );
};

export default EntitiesTable;
