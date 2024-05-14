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
import ArrangementsFilter from "./ArrangementsFilter.jsx";
import { useState, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useGetQuery } from "../../../core/hooks/useApiClientHooks.jsx";

const ArrangementsView = () => {
  const {
    isOpen: isCreateOpen,
    onOpen: onOpenCreate,
    onClose: onCloseCreate,
  } = useDisclosure();
  const { isOpen: isHeaderOpen, onToggle: onToggleHeader } = useDisclosure({
    defaultIsOpen: true,
  });

  const {
    data: arrangementsData,
    isLoading,
    localMutations: {
      add: addArrangement,
      delete: deleteArrangement,
      update: updateArrangement,
    },
  } = useGetQuery("arrangement", null, false);

  const { data: arrangementTypesData } = useGetQuery("arrangementType");
  const { data: wrapperVariantsData } = useGetQuery("wrapperVariant");
  const { data: flowerVariantsData } = useGetQuery("flowerVariant");

  const [filteredArrangements, setFilteredArrangements] = useState(arrangementsData);

  useEffect(() => {
    setFilteredArrangements(filteredArrangements);
  }, [arrangementsData]);

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
                <Button
                  colorScheme="pink"
                  marginLeft="auto"
                  onClick={onOpenCreate}
                >
                  Nueva Plantilla
                </Button>
              </Flex>
              {!isLoading && arrangementsData.length > 0 && (
                <Box position="relative" width="100%">
                  <Divider marginBottom={3} />
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
            {!isLoading && arrangementsData.length > 0 && (
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
          {isLoading ? (
            <Flex alignItems="center" justifyContent="center">
              <Spinner size="xl" />
            </Flex>
          ) : (
            arrangementsData.length === 0 && (
              <Flex alignItems="center" justifyContent="center">
                <Text fontSize="2xl">
                  No tienes plantillas de arreglos registradas
                </Text>
              </Flex>
            )
          )}
          {filteredArrangements.length > 0 && !isLoading && (
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
        isOpen={isCreateOpen}
        onOpen={onOpenCreate}
        onClose={onCloseCreate}
        arrangementTypeData={arrangementTypesData}
        wrappingVariantData={wrapperVariantsData}
        flowerVariantData={flowerVariantsData}
        addArrangement={addArrangement}
      />
    </>
  );
};

export default ArrangementsView;
