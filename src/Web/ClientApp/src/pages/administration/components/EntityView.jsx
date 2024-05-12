import { Flex } from "@chakra-ui/react";
import CreateEntity from "./CreateEntity.jsx";
import { CommunicationType } from "../../../web-api-client.ts";
import EntitiesTable from "./entitiesTable/EntitiesTable.jsx";
import { removeReferenceIdProperties } from "../../../core/helpers/web-api-client.helper.ts";
import { useGetQuery } from "../../../core/hooks/useApiClientHooks.jsx";

const EntityView = ({ title, entityName, entity, fatherEntityName }) => {
  const {
    data: entitiesData,
    localMutations: {
      add: createEntity,
      delete: deleteEntity,
      update: updateEntity,
    },
  } = useGetQuery(entityName);

  const { data: fatherEntityData } = useGetQuery(fatherEntityName);

  return (
    <Flex direction="column" gap={5} px={{ base: 4, md: 6 }} py={6}>
      <CreateEntity
        entityName={entityName}
        title={title}
        entity={removeReferenceIdProperties(entity)}
        fatherEntity={new CommunicationType().toJSON()}
        fatherEntityName="communicationType"
        _createEntity={createEntity}
      />
      <EntitiesTable
        entity={entity}
        entityName={entityName}
        fatherEntityName={fatherEntityName}
        entitiesData={entitiesData}
        fatherEntityData={fatherEntityData}
        deleteEntity={deleteEntity}
        updateEntity={updateEntity}
      />
    </Flex>
  );
};

export default EntityView;
