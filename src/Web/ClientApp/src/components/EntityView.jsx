import { Box } from "@chakra-ui/react";
import CreateEntity from "./CreateEntity.jsx";
import EntitiesTable from "./EntitiesTable.jsx";
import { useEffect, useState } from "react";

const EntityView = ({ title, entityName, entity }) => {
  const [lastUpdated, setLastUpdated] = useState();

  const refreshView = () => setLastUpdated(new Date());

  useEffect(() => refreshView(), [title]);

  return (
    <Box
      gap={5}
      px={{ base: 4, md: 8 }}
      pt={{
        base: 6,
      }}
    >
      <CreateEntity
        entityName={entityName}
        title={title}
        entity={entity}
        refreshView={refreshView}
      />
      <EntitiesTable
        entity={entity}
        entityName={entityName}
        refreshView={refreshView}
        lastUpdated={lastUpdated}
      />
    </Box>
  );
};

export default EntityView;
