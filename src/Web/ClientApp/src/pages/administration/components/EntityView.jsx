import { useEffect, useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
import CreateEntity from "./CreateEntity.jsx";
import { CommunicationType } from "../../../web-api-client.ts";
import EntitiesTable from "./entitiesTable/EntitiesTable.jsx";
import { removeReferenceIdProperties } from "../../../core/helpers/web-api-client.helper.ts";

const EntityView = ({ title, entityName, entity, fatherEntityName }) => {
  const [lastUpdated, setLastUpdated] = useState();
  const refreshView = () => setLastUpdated(new Date());
  useEffect(() => refreshView(), [entityName]);

  return (
    <Box maxW={{ base: "100%", md: "800px" }} w="100%" mx="auto" px={4}>
      <Flex direction="column" gap={5} px={{ base: 0, md: 6 }} py={6}>
        <CreateEntity
          entityName={entityName}
          title={title}
          entity={removeReferenceIdProperties(entity)}
          refreshView={refreshView}
          fatherEntity={new CommunicationType().toJSON()}
          fatherEntityName="communicationType"
        />
        <EntitiesTable
          entity={entity}
          entityName={entityName}
          fatherEntityName={fatherEntityName}
          refreshView={refreshView}
          lastUpdated={lastUpdated}
        />
      </Flex>
    </Box>
  );
};

export default EntityView;
