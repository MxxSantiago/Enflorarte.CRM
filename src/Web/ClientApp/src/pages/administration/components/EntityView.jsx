import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import CreateEntity from "./CreateEntity.jsx";
import { CommunicationType } from "../../../web-api-client.ts";
import EntitiesTable from "./entitiesTable/EntitiesTable.jsx";

const EntityView = ({ title, entityName, entity, fatherEntityName }) => {
  const [lastUpdated, setLastUpdated] = useState();

  const refreshView = () => setLastUpdated(new Date());

  useEffect(() => refreshView(), [entityName]);

  return (
    <Flex direction="column" gap={5} px={{ base: 4, md: 6 }} py={6}>
      <CreateEntity
        entityName={entityName}
        title={title}
        entity={entity}
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
  );
};

export default EntityView;
