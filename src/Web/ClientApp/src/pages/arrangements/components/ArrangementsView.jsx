import React from "react";
import {
  Box,
  Button,
  SimpleGrid,
  Text,
  useDisclosure,
  Flex,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import ArrangementTemplate from "./ArrangementCard.jsx";
import CreateArrangmentTemplate from "./CreateArrangement.jsx";
import { getAllEntities } from "../../../core/helpers/web-api-client.helper.ts";
import Filter from "./Filter.jsx";
import { useState, useEffect } from "react";

const ArrangementsView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [arrangements, setArrangements] = useState([]);
  const [arrangementTypeData, setArrangementTypeData] = useState([]);
  const [wrappingVariantData, setWrappingVariantData] = useState([]);
  const [flowerVariantData, setFlowerVariantData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [valueMenu, setValueMenu] = useState();
  const [filterValue, setFilterValue] = useState("");

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  useEffect(() => {
    populateArrangements();
    populateArrangementTypeEntity();
    populateWrappingTypeEntity();
    populateFlowerTypeEntity();
  }, []);

  const populateArrangements = async () => {
    const arrangements = await getAllEntities("arrangement", false);
    setArrangements(arrangements);
    setLoading(false);
    console.log(arrangements);
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

  const filterArrangements = () => {
    switch (valueMenu) {
      case "":
        return arrangements;

      case "Tipo de Arreglo":
        return arrangements.filter((arrangement) =>
          arrangement.arrangementTypes.some(
            (type) => type.name.toLowerCase() === filterValue.toLowerCase()
          )
        );
      case "Variante de Flor":
        return arrangements.filter((arrangement) =>
          arrangement.flowerVariants.some(
            (variant) =>
              variant.name.toLowerCase() === filterValue.toLowerCase()
          )
        );
      case "Variante de Envoltura":
        return arrangements.filter((arrangement) =>
          arrangement.wrapperVariants.some(
            (variant) =>
              variant.name.toLowerCase() === filterValue.toLowerCase()
          )
        );
      case "Disponible":
        return arrangements.filter(
          (arrangement) => arrangement.isAvailable === true
        );
      case "No disponible":
        return arrangements.filter(
          (arrangement) => arrangement.isAvailable === false
        );

      default:
        return arrangements;
    }
  };

  return (
    <>
      <Box height="100%">
        <SimpleGrid
          width="100%"
          height="100%"
          maxWidth="2000px"
          gridTemplateRows="auto 1fr"
        >
          <Box pt={5}>
            <Flex px={8}>
              <Text margin={0} fontSize="3xl">
                Tus Plantillas
              </Text>
              <Button colorScheme="pink" marginLeft="auto" onClick={onOpen}>
                Nueva Plantilla
              </Button>
            </Flex>
            <Divider marginBottom="auto" />
            <Box px={8} pt={5}>
              <Filter
                valueMenu={valueMenu}
                setValueMenu={setValueMenu}
                arrangementTypeData={arrangementTypeData}
                wrappingVariantData={wrappingVariantData}
                flowerVariantData={flowerVariantData}
                filterValue={filterValue}
                handleFilterChange={handleFilterChange}
              />
            </Box>
          </Box>
          {arrangements.length === 0 ? (
            <Flex alignItems="center" justifyContent="center">
              {loading ? (
                <Spinner size="xl" />
              ) : (
                <Text fontSize="2xl">
                  No tienes plantillas de arreglos registradas
                </Text>
              )}
            </Flex>
          ) : (
            <SimpleGrid
              width="100%"
              minChildWidth="250px"
              spacing={10}
              px={8}
              py={5}
              overflow="auto"
            >
              {filterArrangements().map((arrangement) => (
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
          )}
        </SimpleGrid>
      </Box>
      <CreateArrangmentTemplate
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        arrangementTypeData={arrangementTypeData}
        wrappingVariantData={wrappingVariantData}
        flowerVariantData={flowerVariantData}
        addArrangement={addArrangement}
      />
    </>
  );
};

export default ArrangementsView;
