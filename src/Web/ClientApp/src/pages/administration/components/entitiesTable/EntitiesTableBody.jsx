import { Tbody } from "@chakra-ui/react";
import EntitiesTableItem from "./EntitiesTableItem";

const EntitiesTableBody = ({
  items,
  entityName,
  refreshView,
  lastUpdated,
  fatherEntityName,
  fatherEntityData,
}) => (
  <Tbody>
    {items.map((item) => (
      <EntitiesTableItem
        lastUpdated={lastUpdated}
        key={item.id}
        item={item}
        entityName={entityName}
        fatherEntityName={fatherEntityName}
        refreshView={refreshView}
        fatherEntityData={fatherEntityData}
      />
    ))}
  </Tbody>
);

export default EntitiesTableBody;
