import { Box, Grid, useBreakpointValue } from "@chakra-ui/react";
import CreateEntity from "./CreateEntity.jsx";
import { useEffect, useState } from "react";
import EntitiesTable from "./entitiesTable/EntitiesTable.jsx";
import { removeReferenceObjectProperties } from "../../../core/helpers/web-api-client.helper.ts";

const EntityWithVariantView = ({
  title,
  variantTitle,
  entityName,
  entity,
  variantName,
  variant,
}) => {
  const [lastUpdated, setLastUpdated] = useState();
  const gridTemplateColumns = useBreakpointValue({
    md: "repeat(1, 1fr)",
    lg: "repeat(2, 1fr)",
  });

  const refreshView = () => setLastUpdated(new Date());

  useEffect(() => refreshView(), [title]);

  return (
    <Box width="100%">
      <Grid
        templateColumns={gridTemplateColumns}
        gap={5}
        px={{ base: 4, md: 6 }}
        py={6}
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
            entity={removeReferenceObjectProperties(variant)}
            refreshView={refreshView}
            fatherEntity={entity}
            fatherEntityName={entityName}
            lastUpdated={lastUpdated}
          />
        </Box>
        <Box order={{ md: 4, lg: 4 }}>
          <EntitiesTable
            entity={variant}
            entityName={variantName}
            fatherEntityName={entityName}
            refreshView={refreshView}
            lastUpdated={lastUpdated}
          />
        </Box>
      </Grid>
    </Box>
  );
};

export default EntityWithVariantView;
