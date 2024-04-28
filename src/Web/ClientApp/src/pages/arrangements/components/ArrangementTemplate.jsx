import { Card, Text, Image, useDisclosure } from "@chakra-ui/react";
import Arrangment from "../Assest/ArregloPlantilla.jpeg";
import UpdateArrangement from "./UpdateArrangement";

const ArrangementTemplate = ({
  arrangement,
  deleteArrangement,
  updateArrangement,
  arrangementTypeData,
  wrappingVariantData,
  flowerVariantData,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Card
      variant="outline"
      height="400px"
      width="100%"
      maxWidth="450px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      borderRadius="lg"
      boxShadow="lg"
      onClick={onOpen}
      cursor="pointer"
    >
      <Image
        src={arrangement.referenceImage ?? Arrangment}
        alt="Arrangement"
        height="370px"
        borderRadius="lg"
        objectFit="cover"
        _hover={{
          filter: "brightness(0.8)",
          transition: "0.3s ease-in-out all",
        }}
      />
      <Text display="flex" justifyContent="center" as="b" pb="2px">
        {arrangement.name}
      </Text>

      <UpdateArrangement
        isOpenUpdate={isOpen}
        onOpenUpdate={onOpen}
        onCloseUpdate={onClose}
        arrangement={arrangement}
        deleteArrangement={deleteArrangement}
        updateArrangement={updateArrangement}
        arrangementTypeData={arrangementTypeData}
        wrappingVariantData={wrappingVariantData}
        flowerVariantData={flowerVariantData}
      />
    </Card>
  );
};

export default ArrangementTemplate;
