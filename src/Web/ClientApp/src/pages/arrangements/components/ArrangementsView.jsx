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
import { useGetQuery } from "../../../core/hooks/useApiClientHooks.tsx";
import {
  createColorScheme,
  spinnerConfiguration,
} from "../../../core/constants.ts";

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
    isLoading: isArrangementsLoading,
    refetch,
  } = useGetQuery("arrangement");

  const { data: arrangementTypesData, isArrangementTypesLoading } =
    useGetQuery("arrangementType");
  const { data: wrapperVariantsData, isWrapperVariantsLoading } =
    useGetQuery("wrapperVariant");
  const { data: flowerVariantsData, isFlowerVariantsLoading } =
    useGetQuery("flowerVariant");

  const [filteredArrangements, setFilteredArrangements] =
    useState(arrangementsData);

  const isLoading =
    isArrangementsLoading ||
    isArrangementTypesLoading ||
    isWrapperVariantsLoading ||
    isFlowerVariantsLoading;

  useEffect(() => {
    setFilteredArrangements(arrangementsData);
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
              <Flex pb={3} px={8}>
                <Text margin={0} fontSize="3xl">
                  Tus Plantillas
                </Text>
                <Button
                  colorScheme={createColorScheme}
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
                      colorScheme="cyan"
                      onClick={onToggleHeader}
                    />
                  </AbsoluteCenter>
                </Box>
              )}
            </Box>
            {!isLoading && arrangementsData.length > 0 && (
              <Collapse in={isHeaderOpen}>
                <Box>
                  <Flex pb={5} px={8} pt={5} direction="column">
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
              <Spinner {...spinnerConfiguration} />
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
                  refetch={refetch}
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
        refetch={refetch}
        arrangementsData={arrangementsData}
      />
    </>
  );
};

export default ArrangementsView;
