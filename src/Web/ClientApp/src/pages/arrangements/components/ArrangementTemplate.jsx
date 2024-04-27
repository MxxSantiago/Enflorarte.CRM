import { Card, Text, Image, useDisclosure } from "@chakra-ui/react";
import Arrangment from "../Assest/ArregloPlantilla.jpeg";
import CreateArrangmentTemplate from "./CreateArrangementTemplate";

const ArrangementTemplate = ({ item, index }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Card
      key={index}
      variant="outline"
      height="300px"
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      borderRadius="lg"
      boxShadow="lg"
      onClick={onOpen}
      cursor="pointer"
    >
      <Image
        src={Arrangment}
        alt="Arrangement"
        height="270px"
        borderRadius="lg"
        objectFit="cover"
        _hover={{ filter: "blur(2px)" }}
      />
      <Text display="flex" justifyContent="center" as="b" pb="2px">
        Nombre Arreglo
      </Text>

      <CreateArrangmentTemplate
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </Card>
  );
};

export default ArrangementTemplate;
