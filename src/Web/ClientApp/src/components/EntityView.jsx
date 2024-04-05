import { Box } from "@chakra-ui/react";
import CreateEntity from "./CreateEntity.jsx";
import Tabla from "./Tabla.jsx";

const EntityView = ({ titulo, entityName, entity }) => (
  <Box
    display="flex"
    flexDirection="column"
    gap={5}
    px={{ base: 4, md: 8 }}
    pt={{
      base: 6,
    }}
  >
    <CreateEntity entityName={entityName} titulo={titulo} entity={entity} />
    <Tabla entityName={entityName} />
  </Box>
);

export default EntityView;
