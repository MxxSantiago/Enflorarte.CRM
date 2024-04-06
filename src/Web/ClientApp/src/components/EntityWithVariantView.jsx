import { Box, Grid, useBreakpointValue } from "@chakra-ui/react";
import CreateEntity from "./CreateEntity.jsx";
import EntitiesTable from "./EntitiesTable.jsx";
import { useEffect, useState } from "react";

const EntityWithVariantView = ({
  title,
  variantTitle,
  entityName,
  entity,
  variantName,
  variant,
}) => {
  const [lastUpdated, setLastUpdated] = useState();

  const refreshView = () => setLastUpdated(new Date());

  useEffect(() => refreshView(), [title]);

  const gridTemplateColumns = useBreakpointValue({
    md: "repeat(1, 1fr)",
    lg: "repeat(2, 1fr)",
  });

  return (
    <Grid
      templateColumns={gridTemplateColumns}
      gap={5}
      px={{ md: 4, lg: 8 }}
      pt={{
        md: 6,
      }}
    >
      <Box order={{ md: 1, lg: 1 }}>
        <CreateEntity
          entityName={entityName}
          title={title}
          entity={entity}
          refreshView={refreshView}
        />
      </Box>
      <Box order={{ md: 2, lg: 3 }}>
        <EntitiesTable
          entity={entity}
          entityName={entityName}
          refreshView={refreshView}
          lastUpdated={lastUpdated}
        />
      </Box>
      <Box order={{ md: 3, lg: 2 }}>
        <CreateEntity
          entityName={variantName}
          title={variantTitle}
          entity={variant}
          refreshView={refreshView}
          fatherEntity={entity}
          fatherEntityName={entityName}
        />
      </Box>
      <Box order={{ md: 4, lg: 4 }}>
        <EntitiesTable
          entity={variant}
          entityName={variantName}
          refreshView={refreshView}
          lastUpdated={lastUpdated}
        />
      </Box>
    </Grid>
  );
};

export default EntityWithVariantView;
