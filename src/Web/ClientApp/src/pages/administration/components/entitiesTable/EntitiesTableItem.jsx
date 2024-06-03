import { Tr, Td, Flex } from "@chakra-ui/react";
import ModifyEntity from "../ModifyEntity";
import DeleteEntity from "../DeleteEntity";

const EntitiesTableItem = ({
  item,
  entityName,
  lastUpdated,
  fatherEntityName,
  fatherEntityData,
  refetch,
}) => {

  return(
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
          fatherEntityName={fatherEntityName}
          fatherEntityData={fatherEntityData}
          refetch={refetch}
        />
        <DeleteEntity entityName={entityName} entity={item} refetch={refetch} />
      </Flex>
    </Td>
  </Tr>
  );
}

export default EntitiesTableItem;
