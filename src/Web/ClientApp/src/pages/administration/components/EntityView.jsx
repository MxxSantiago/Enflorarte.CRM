import { Grid, Box, Text } from "@chakra-ui/react";
import CreateEntity from "./CreateEntity.jsx";
import EntitiesTable from "./entitiesTable/EntitiesTable.jsx";
import { removeReferenceIdProperties } from "../../../core/helpers/web-api-client.helper.ts";
import { useGetQuery } from "../../../core/hooks/useApiClientHooks.tsx";
import { LANG } from "../../../core/helpers/translations.helper.ts";

const EntityView = ({ title, entityName, entity, fatherEntityName }) => {
  const {
    data: entitiesData,
    refetch,
    isLoading: isEntitiesLoading,
  } = useGetQuery(entityName);
  const { data: fatherEntityData, isLoading: isFatherEntitiesLoading } =
    useGetQuery(fatherEntityName);

  const isLoading = isEntitiesLoading || isFatherEntitiesLoading;

  return (
    <Grid
      height="100%"
      width="100%"
      gridTemplateRows="60px calc(100% - 60px)"
      px={{ base: 4, md: 6 }}
      py={4}
    >
      <Box display="flex" width="100%" alignItems="center" height="100%">
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
          entity={removeReferenceIdProperties(entity)}
          fatherEntityName="communicationType"
          refetch={refetch}
          entitiesData={entitiesData}
          marginLeft="auto"
        />
      </Box>
      <EntitiesTable
        entity={entity}
        entityName={entityName}
        fatherEntityName={fatherEntityName}
        entitiesData={entitiesData}
        fatherEntityData={fatherEntityData}
        refetch={refetch}
        isLoading={isLoading}
      />
    </Grid>
  );
};

export default EntityView;
