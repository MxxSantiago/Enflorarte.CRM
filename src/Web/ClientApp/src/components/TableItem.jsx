import { Tr, Td, Flex } from "@chakra-ui/react";
import ModifyEntity from "./ModifyEntity";
import DeleteEntity from "./DeleteEntity";

const TableItem = ({
  item,
  entityName,
  refreshView,
  lastUpdated,
  fatherEntityName,
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

export default TableItem;
