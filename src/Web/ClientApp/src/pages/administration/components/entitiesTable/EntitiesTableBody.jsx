import { Tbody } from "@chakra-ui/react";
import EntitiesTableItem from "./EntitiesTableItem";

const EntitiesTableBody = ({
  items,
  entityName,
  fatherEntityName,
  fatherEntityData,
  deleteEntity,
  updateEntity,
}) => (
  <Tbody>
    {items.map((item) => (
      <EntitiesTableItem
        key={item.id}
        item={item}
        entityName={entityName}
        fatherEntityName={fatherEntityName}
        fatherEntityData={fatherEntityData}
        deleteEntity={deleteEntity}
        updateEntity={updateEntity}
      />
    ))}
  </Tbody>
);

export default EntitiesTableBody;
