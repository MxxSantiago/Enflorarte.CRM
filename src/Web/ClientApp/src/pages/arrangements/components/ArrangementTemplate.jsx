import { Card, Text, Image, useDisclosure } from "@chakra-ui/react";
import Arrangment from "../Assest/ArregloPlantilla.jpeg";
import UpdateArrangement from "./UpdateArrangement";
import { useState } from "react";

const ArrangementTemplate = ({ item, index }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Card
      key={index}
      variant="outline"
      height="400px"
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
        height="370px"
        borderRadius="lg"
        objectFit="cover"
        _hover={{ filter: "blur(2px)" }}
      />
      <Text display="flex" justifyContent="center" as="b" pb="2px">
        {item.name}
      </Text>

      <UpdateArrangement
        isOpenUpdate={isOpen}
        onOpenUpdate={onOpen}
        onCloseUpdate={onClose}
        item={item}
      />
    </Card>
  );
};

export default ArrangementTemplate;
