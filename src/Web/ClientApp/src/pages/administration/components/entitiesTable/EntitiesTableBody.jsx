import { Tbody } from "@chakra-ui/react";
import EntitiesTableItem from "./EntitiesTableItem";

const EntitiesTableBody = ({
  items,
  entityName,
  fatherEntityName,
  fatherEntityData,
  refetch,
}) => (
  <Tbody>
    {items.map((item) => (
      <EntitiesTableItem
        key={item.id}
        item={item}
        entityName={entityName}
        fatherEntityName={fatherEntityName}
        fatherEntityData={fatherEntityData}
        refetch={refetch}
      />
    ))}
  </Tbody>
);

export default EntitiesTableBody;
