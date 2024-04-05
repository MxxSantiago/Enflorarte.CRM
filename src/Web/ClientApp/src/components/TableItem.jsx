import { Tr, Td, Flex } from "@chakra-ui/react";
import ModifyEntity from "./ModifyEntity";
import DeleteEntity from "./DeleteEntity";

const TableItem = ({ item, entityName }) => {
  return (
    <Tr key={item.id}>
      <Td>{item.name}</Td>
      <Td>
        <Flex justifyContent="flex-end" gap="10px">
          <ModifyEntity entityName={entityName} entity={item} />
          <DeleteEntity entityName={entityName} entity={item} />
        </Flex>
      </Td>
    </Tr>
  );
};

export default TableItem;
