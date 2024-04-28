import React from "react";
import { Box, Button, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import ArrangementTemplate from "./ArrangementTemplate";
import CreateArrangmentTemplate from "./CreateArrangementTemplate";
import { getAllEntities } from "../../../core/helpers/web-api-client.helper.ts";

import { useState, useEffect } from "react";

const ArrangementsView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [arrangements, setArrangements] = useState([]);
  const [arrangementTypeData, setArrangementTypeData] = useState([]);
  const [wrappingVariantData, setWrappingVariantData] = useState([]);
  const [flowerVariantData, setFlowerVariantData] = useState([]);

  useEffect(() => {
    populateArrangements();
    populateArrangementTypeEntity();
    populateWrappingTypeEntity();
    populateFlowerTypeEntity();
  }, []);

  const populateArrangements = async () => {
    const arrangements = await getAllEntities("arrangement", false);
    setArrangements(arrangements);
  };

  const populateArrangementTypeEntity = async () => {
    const data = await getAllEntities("arrangementType");
    setArrangementTypeData(data);
  };

  const populateWrappingTypeEntity = async () => {
    const data = await getAllEntities("wrapperVariant");
    setWrappingVariantData(data);
  };

  const populateFlowerTypeEntity = async () => {
    const data = await getAllEntities("flowerVariant");
    setFlowerVariantData(data);
  };

  const addArrangement = (arrangement) => {
    setArrangements([...arrangements, arrangement]);
  };

  const deleteArrangement = (id) => {
    const newArregements = arrangements.filter((a) => a.id !== id);
    setArrangements(newArregements);
  };

  const updateArrangement = (arrangement) => {
    const newArregements = arrangements.map((a) =>
      a.id === arrangement.id ? arrangement : a
    );
    setArrangements(newArregements);
  };

  return (
    <Box py={5} px={8} width="100%" display="flex" justifyContent="center">
      <Box width="100%" maxWidth="2000px">
        <Box display="flex">
          <Button colorScheme="pink" marginLeft="auto" onClick={onOpen}>
            Nueva Plantilla
          </Button>
        </Box>
        <Text fontSize="3xl">Tus Plantillas</Text>
        <SimpleGrid minChildWidth="250px" spacing={10} width="100%">
          {arrangements.map((arrangement) => (
            <ArrangementTemplate
              key={arrangement.id}
              arrangement={arrangement}
              deleteArrangement={deleteArrangement}
              updateArrangement={updateArrangement}
              arrangementTypeData={arrangementTypeData}
              wrappingVariantData={wrappingVariantData}
              flowerVariantData={flowerVariantData}
            />
          ))}
        </SimpleGrid>

        <CreateArrangmentTemplate
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          arrangementTypeData={arrangementTypeData}
          wrappingVariantData={wrappingVariantData}
          flowerVariantData={flowerVariantData}
          addArrangement={addArrangement}
        />
      </Box>
    </Box>
  );
};

export default ArrangementsView;
