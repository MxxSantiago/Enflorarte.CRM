import { Divider, Box, Text, Grid, useBreakpointValue } from "@chakra-ui/react";
import CreateEntity from "./CreateEntity.jsx";
import EntitiesTable from "./entitiesTable/EntitiesTable.jsx";
import { removeReferenceObjectProperties } from "../../../core/helpers/web-api-client.helper.ts";
import { useGetQuery } from "../../../core/hooks/useApiClientHooks.tsx";
import { LANG } from "../../../core/helpers/translations.helper.ts";

const EntityWithVariantView = ({
  title,
  variantTitle,
  entityName,
  entity,
  variantName,
  variant,
}) => {
  const gridTemplateColumns = useBreakpointValue({
    base: "1fr",
    xl: "repeat(2, 1fr)",
  });

  const gridTemplateRows = useBreakpointValue({
    base: "auto auto auto auto",
    xl: "auto 1fr",
  });

  const {
    data: entitiesData,
    isLoading: isEntitiesLoading,
    refetch: refetchEntity,
  } = useGetQuery(entityName);

  const {
    data: variantsData,
    isLoading: isVariantsLoading,
    refetch: refetchVariant,
  } = useGetQuery(variantName);

  return (
    <Grid
      height={{
        base: "auto",
        xl: "100%",
      }}
      width="100%"
      templateColumns={gridTemplateColumns}
      templateRows={gridTemplateRows}
      gap="0 2rem"
      px={{ base: 4, md: 6 }}
      py={6}
      overflowY={{
        base: "auto",
        xl: "hidden",
      }}
    >
      <Box
        display="flex"
        width="100%"
        alignItems="center"
        height="100%"
        order={{ xl: 1 }}
        paddingBottom={4}
      >
        <Text
          fontSize={{
            base: "lg",
            md: "2xl",
          }}
          fontWeight="bold"
          marginBottom={2}
        >
          {LANG(entityName)}
        </Text>
        <CreateEntity
          entityName={entityName}
          title={title}
          entity={entity}
          refetch={refetchEntity}
          entitiesData={entitiesData}
          marginLeft="auto"
        />
      </Box>
      <EntitiesTable
        entity={entity}
        entityName={entityName}
        entitiesData={entitiesData}
        isLoading={isEntitiesLoading}
        refetch={refetchEntity}
        order={{ xl: 3 }}
        height={{
          base: "calc(100vh - 200px)",
        }}
      />
      <Divider
        display={{
          base: "block",
          xl: "none",
        }}
        my={10}
      />
      <Box
        display="flex"
        width="100%"
        alignItems="center"
        height="100%"
        order={{ xl: 2 }}
        paddingBottom={4}
      >
        <Text
          fontSize={{
            base: "lg",
            md: "2xl",
          }}
          fontWeight="bold"
          marginBottom={2}
        >
          {LANG(variantName)}
        </Text>
        <CreateEntity
          entityName={variantName}
          title={variantTitle}
          entity={removeReferenceObjectProperties(variant)}
          fatherEntityName={entityName}
          refetch={refetchVariant}
          variantName={variantName}
          marginLeft="auto"
        />
      </Box>
      <EntitiesTable
        entity={variant}
        entityName={variantName}
        fatherEntityName={entityName}
        fatherEntityData={entitiesData}
        entitiesData={variantsData}
        isLoading={isVariantsLoading}
        refetch={refetchVariant}
        order={{ xl: 4 }}
        height={{
          base: "calc(100vh - 200px)",
        }}
      />
    </Grid>
  );
};

export default EntityWithVariantView;
