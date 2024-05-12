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
  deleteEntity,
  updateEntity,
}) => (
  <Tr key={item.id}>
    {Object.keys(item)
      .filter((key) => key.toLowerCase().indexOf("id") === -1)
      .map((key) =>
        item[key].name ? (
          <Td key={key}>{item[key].name}</Td>
        ) : (
          <Td key={key}>{item[key]}</Td>
        )
      )}
    <Td>
      <Flex justifyContent="flex-end" gap="10px">
        <ModifyEntity
          lastUpdated={lastUpdated}
          entityName={entityName}
          entity={item}
          refreshView={refreshView}
          fatherEntityName={fatherEntityName}
          fatherEntityData={fatherEntityData}
          _updateEntity={updateEntity}
        />
        <DeleteEntity
          entityName={entityName}
          entity={item}
          refreshView={refreshView}
          _deleteEntity={deleteEntity}
        />
      </Flex>
    </Td>
  </Tr>
);

export default EntitiesTableItem;
