import { Card, Text, Image, useDisclosure } from "@chakra-ui/react";
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
    <>
      <Card
        variant="outline"
        height="400px"
        width="100%"
        maxWidth="450px"
        display="flex"
        flexDirection="column"
        overflow="hidden"
        borderRadius="lg"
        boxShadow="lg"
        onClick={onOpen}
        cursor="pointer"
        _hover={{
          "> img": {
            filter: "brightness(0.8)",
            transition: "0.3s ease-in-out all",
          },
        }}
      >
        <Image
          src={arrangement.referenceImage}
          height="350px"
          objectFit="cover"
          margin={0}
        />
        <Text
          height="50px"
          textAlign="center"
          as="b"
          fontSize="lg"
          overflowY="auto"
          paddingY={2.5}
        >
          {arrangement.name}
        </Text>
      </Card>
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
    </>
  );
};

export default ArrangementTemplate;
