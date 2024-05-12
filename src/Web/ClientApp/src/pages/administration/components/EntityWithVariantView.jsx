import { Box, Grid, useBreakpointValue } from "@chakra-ui/react";
import CreateEntity from "./CreateEntity.jsx";
import EntitiesTable from "./entitiesTable/EntitiesTable.jsx";
import { removeReferenceObjectProperties } from "../../../core/helpers/web-api-client.helper.ts";
import { useGetQuery } from "../../../core/hooks/useApiClientHooks.jsx";

const EntityWithVariantView = ({
  title,
  variantTitle,
  entityName,
  entity,
  variantName,
  variant,
}) => {
  const gridTemplateColumns = useBreakpointValue({
    md: "repeat(1, 1fr)",
    lg: "repeat(2, 1fr)",
  });

  const {
    data: entitiesData,
    localMutations: {
      add: addEntity,
      delete: deleteEntity,
      update: updateEntity,
    },
  } = useGetQuery(entityName);

  const {
    data: variantsData,
    localMutations: {
      add: addVariant,
      delete: deleteVariant,
      update: updateVariant,
    },
  } = useGetQuery(variantName);

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
            _createEntity={addEntity}
          />
        </Box>
        <Box order={{ md: 2, lg: 3 }}>
          <EntitiesTable
            entity={entity}
            entityName={entityName}
            entitiesData={entitiesData}
            deleteEntity={deleteEntity}
            updateEntity={updateEntity}
          />
        </Box>
        <Box order={{ md: 3, lg: 2 }}>
          <CreateEntity
            entityName={variantName}
            title={variantTitle}
            entity={removeReferenceObjectProperties(variant)}
            fatherEntity={entity}
            fatherEntityName={entityName}
            _createEntity={addVariant}
          />
        </Box>
        <Box order={{ md: 4, lg: 4 }}>
          <EntitiesTable
            entity={variant}
            entityName={variantName}
            fatherEntityName={entityName}
            fatherEntityData={entitiesData}
            entitiesData={variantsData}
            deleteEntity={deleteVariant}
            updateEntity={updateVariant}
          />
        </Box>
      </Grid>
    </Box>
  );
};

export default EntityWithVariantView;
