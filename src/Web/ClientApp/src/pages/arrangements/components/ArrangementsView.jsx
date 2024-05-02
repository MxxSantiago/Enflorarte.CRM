import {
  Box,
  Button,
  SimpleGrid,
  Text,
  useDisclosure,
  Flex,
  Divider,
  Spinner,
  Collapse,
  IconButton,
  AbsoluteCenter,
} from "@chakra-ui/react";
import ArrangementCard from "./ArrangementCard.jsx";
import CreateArrangmentTemplate from "./CreateArrangement.jsx";
import { getAllEntities } from "../../../core/helpers/web-api-client.helper.ts";
import ArrangementsFilter from "./ArrangementsFilter.jsx";
import { useState, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

const ArrangementsView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [arrangementsData, setArrangementsData] = useState([]);
  const [arrangementTypesData, setArrangementTypeData] = useState([]);
  const [wrapperVariantsData, setWrappingVariantData] = useState([]);
  const [flowerVariantsData, setFlowerVariantData] = useState([]);
  const [filteredArrangements, setFilteredArrangements] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isOpen: isHeaderOpen, onToggle: onToggleHeader } = useDisclosure({
    defaultIsOpen: true,
  });

  useEffect(() => {
    populateArrangements();
    populateArrangementTypeEntity();
    populateWrappingTypeEntity();
    populateFlowerTypeEntity();
  }, []);

  useEffect(() => {
    setFilteredArrangements(arrangementsData);
  }, [arrangementsData]);

  const populateArrangements = async () => {
    const arrangements = await getAllEntities("arrangement", false);
    setArrangementsData(arrangements);
    setLoading(false);
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
    setArrangementsData([...arrangementsData, arrangement]);
  };

  const deleteArrangement = (id) => {
    const newArregements = arrangementsData.filter((a) => a.id !== id);
    setArrangementsData(newArregements);
  };

  const updateArrangement = (arrangement) => {
    const newArregements = arrangementsData.map((a) =>
      a.id === arrangement.id ? arrangement : a
    );
    setArrangementsData(newArregements);
  };

  return (
    <>
      <Flex height="100%" justifyContent="center">
        <SimpleGrid
          width="100%"
          height="100%"
          maxWidth="2000px"
          gridTemplateRows="auto 1fr"
        >
          <Box>
            <Box pt={5}>
              <Flex px={8}>
                <Text margin={0} fontSize="3xl">
                  Tus Plantillas
                </Text>
                <Button colorScheme="pink" marginLeft="auto" onClick={onOpen}>
                  Nueva Plantilla
                </Button>
              </Flex>
              {arrangementsData.length > 0 && (
                <Box position="relative" width="100%">
                  <Divider marginBottom={0} />
                  <AbsoluteCenter zIndex={1}>
                    <IconButton
                      borderRadius="full"
                      fontSize={20}
                      aria-label="Mostrar/Ocultar Filtros de la Cabecera"
                      icon={
                        isHeaderOpen ? <ChevronUpIcon /> : <ChevronDownIcon />
                      }
                      colorScheme="pink"
                      onClick={onToggleHeader}
                    />
                  </AbsoluteCenter>
                </Box>
              )}
            </Box>
            {arrangementsData.length > 0 && (
              <Collapse in={isHeaderOpen}>
                <Box>
                  <Flex px={8} pt={8} direction="column">
                    <ArrangementsFilter
                      arrangements={arrangementsData}
                      setFilteredArrangements={setFilteredArrangements}
                      filterData={{
                        arrangementTypes: arrangementTypesData,
                        wrapperVariants: wrapperVariantsData,
                        flowerVariants: flowerVariantsData,
                      }}
                    />
                  </Flex>
                  <Divider marginBottom={0} />
                </Box>
              </Collapse>
            )}
          </Box>
          {arrangementsData.length === 0 ? (
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
              height="100%"
              minChildWidth="300px"
              spacing={8}
              px={8}
              py={{
                base: 8,
                md: 5,
              }}
              overflow="auto"
            >
              {filteredArrangements.map((arrangement) => (
                <ArrangementCard
                  key={arrangement.id}
                  arrangement={arrangement}
                  deleteArrangement={deleteArrangement}
                  updateArrangement={updateArrangement}
                  arrangementTypeData={arrangementTypesData}
                  wrappingVariantData={wrapperVariantsData}
                  flowerVariantData={flowerVariantsData}
                />
              ))}
            </SimpleGrid>
          )}
        </SimpleGrid>
      </Flex>
      <CreateArrangmentTemplate
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        arrangementTypeData={arrangementTypesData}
        wrappingVariantData={wrapperVariantsData}
        flowerVariantData={flowerVariantsData}
        addArrangement={addArrangement}
      />
    </>
  );
};

export default ArrangementsView;
