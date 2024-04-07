import { Tr, Td, Flex } from "@chakra-ui/react";
import ModifyEntity from "../ModifyEntity";
import DeleteEntity from "../DeleteEntity";

const EntitiesTableItem = ({
  item,
  entityName,
  refreshView,
  lastUpdated,
  fatherEntityName,
  fatherEntityData,
}) => (
  <Tr key={item.id}>
    {Object.keys(item)
      .filter((key) => key.toLowerCase().indexOf("id") === -1)
      .map((key) => (
        <Td key={key}>{item[key]}</Td>
      ))}
    <Td>
      <Flex justifyContent="flex-end" gap="10px">
        <ModifyEntity
          lastUpdated={lastUpdated}
          entityName={entityName}
          entity={item}
          refreshView={refreshView}
          fatherEntityName={fatherEntityName}
          fatherEntityData={fatherEntityData}
        />
        <DeleteEntity
          entityName={entityName}
          entity={item}
          refreshView={refreshView}
        />
      </Flex>
    </Td>
  </Tr>
);

export default EntitiesTableItem;
