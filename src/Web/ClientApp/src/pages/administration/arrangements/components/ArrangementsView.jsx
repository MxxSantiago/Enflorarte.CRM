import {
  SimpleGrid,
  Box,
  Button,
  Text,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import ArrangementTemplate from "./ArrangementTemplate";
import CreateArrangmentTemplate from "./CreateArrangementTemplate";

const ArrangementsView = () => {
  const arrangement = {
    IsTemplate: true,
    TypeId: 1,
    image: "https://via.placeholder.com/500",
    Type: "Type 1",
    Wrappings: [{ name: "Wrapping 1" }, { name: "Wrapping 2" }],
    Flowers: [{ name: "Flower 1" }, { name: "Flower 2" }],
    Extras: ["Extra 1", "Extra 2"],
    Message: "This is a message",
  };

  const items = Array(50).fill(arrangement);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box py={5} px={8} width="100%">
      <Box display="flex">
        <Input placeholder="Filtrar por tipo de Arreglo" width="20%" mb={4} />
        <Button colorScheme="pink" marginLeft="auto" onClick={onOpen}>
          Nueva Plantilla
        </Button>
      </Box>
      <Text fontSize="3xl">Tus Plantillas</Text>
      <SimpleGrid minChildWidth="250px" spacing={10} width="100%">
        {items.map((item, index) => (
          <ArrangementTemplate item={item} key={index} />
        ))}
      </SimpleGrid>

      <CreateArrangmentTemplate
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </Box>
  );
};

export default ArrangementsView;
