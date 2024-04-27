import React, {useState, useEffect} from "react";
import { Button, Text, Box, Textarea, Select, Stack } from "@chakra-ui/react";
import AutocompleteSelect from "../../../../components/shared/AutocompleteSelect";
import {getAllEntities} from "../../../../core/helpers/web-api-client.helper.ts";
function Form() {
    const [arrangementType, setArrangementTypeData] = useState([]);
    const [wrappingVariant, setWrappingVariantData] = useState([]);
    const [flowerVariant, setFlowerVariantData] = useState([]);
    const [selectedArrangementType, setSelectedArrangementType] = useState([]);
    const [selectedWrappingVariant, setSelectedWrappingVariant] = useState([]);
    const [selectedFlowerVariant, setSelectedFlowerVariant] = useState([]);
    const [properties, setProperties] = useState();

    useEffect(() => {
            populateArrangementTypeEntity();
            populateWrappingTypeEntity();
            populateFlowerTypeEntity();
    }, []);

    const populateArrangementTypeEntity = async () => {
        const data = await getAllEntities("arrangementType");
        setArrangementTypeData(data);
    };

    const populateWrappingTypeEntity = async () => {
        const data = await getAllEntities("wrapperVariant");
        setWrappingVariantData(data);
    }

    const populateFlowerTypeEntity = async () => {
        const data = await getAllEntities("flowerVariant");
        setFlowerVariantData(data);
    }

    const handleSelectedItemChange = (selectedItem, property, setSelectedItem) => {
        if (selectedItem.length) {
            setSelectedItem(selectedItem);
            setProperties({
                ...properties,
                [property]: "" + selectedItem[0]?.value,
            });
        } else {
            setSelectedItem([]);
            setProperties({
                ...properties,
                [property]: "",
            });
        }
    };


  return (
    <Box display="flex" justifyContent="center">
      <Stack
        direction="column"
        w="100%"
        p="10px"
        overflow="auto"
        maxH={{ base: "200px", md: "420px" }}
        h={{ base: "200px", md: "420px" }}
      >
        <Box pb="5px">
          <Text>Tipo de Arreglo</Text>
            <AutocompleteSelect
                _items={arrangementType.map((item) => ({
                    value: item.id,
                    label: item.name,
                }))}
                onChange={(e) => handleSelectedItemChange(e, "arrangementTypeId", setSelectedArrangementType)}
                selectedItem={selectedArrangementType}
            />
          <Button
            colorScheme="pink"
            display="flex"
            marginLeft="auto"
            mt="10px"
            size="sm"
          >
            Agregar
          </Button>
        </Box>
        <Box pb="5px">
          <Text>Variante de Envoltura</Text>
            <AutocompleteSelect
                _items={wrappingVariant.map((item) => ({
                    value: item.id,
                    label: item.name,
                }))}
                onChange={(e) => handleSelectedItemChange(e, "wrappingVariantId", setSelectedWrappingVariant)}
                selectedItem={selectedWrappingVariant}
            />
          <Button
            colorScheme="pink"
            display="flex"
            marginLeft="auto"
            mt="10px"
            size="sm"
          >
            Agregar
          </Button>
        </Box>
        <Box pb="5px">
          <Text>Variante de Flor</Text>
            <AutocompleteSelect
                _items={flowerVariant.map((item) => ({
                    value: item.id,
                    label: item.name,
                }))}
                onChange={(e) => handleSelectedItemChange(e, "wrappingVariantId", setSelectedFlowerVariant)}
                selectedItem={selectedFlowerVariant}
            />
          <Button
            colorScheme="pink"
            display="flex"
            marginLeft="auto"
            mt="10px"
            size="sm"
          >
            Agregar
          </Button>
        </Box>
        <Box pb="5px">
          <Text>Disponible</Text>
            <Select
                onChange={(e) => handleSelectedItemChange(e, "isAvailable", setSelectedItem) }
            >
                <option value="Disponible">Disponible</option>
                <option value="No disponible">No disponible</option>
            </Select>
        </Box>
        <Box pb="5px">
          <Text>Extra</Text>
          <Textarea></Textarea>
        </Box>
      </Stack>
    </Box>
  );
}

export default Form;
