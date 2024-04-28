import React from "react";
import {
  Box,
  Button,
  Input,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import ArrangementTemplate from "./ArrangementTemplate";
import CreateArrangmentTemplate from "./CreateArrangementTemplate";
import { getAllEntities } from "../../../core/helpers/web-api-client.helper.ts";

import { useState, useEffect } from "react";

const ArrangementsView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchArrangements();
  }, []);

  const fetchArrangements = async () => {
    try {
      const arrangements = await getAllEntities("arrangement", false);
      setItems(arrangements);
    } catch (error) {
      console.error("Error fetching arrangements:", error);
    }
  };

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
