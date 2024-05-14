import { useEffect, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
  Select,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import { LANG } from "../../../core/helpers/translations.helper.ts";
import { primaryColorScheme } from "../../../core/constants.ts";

const filters = [
  { name: "Tipo de Arreglo", field: "arrangementTypes" },
  { name: "Variante de Flor", field: "flowerVariants" },
  { name: "Variante de Envoltura", field: "wrapperVariants" },
  { name: "Disponibilidad", field: "isAvailable" },
];

function ArrangementsFilter({
  arrangements,
  setFilteredArrangements,
  filterData,
}) {
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [filterValue, setFilterValue] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({});

  useEffect(() => {
    setFilteredArrangements(filterArrangements());
  }, [appliedFilters]);

  const filterArrangements = () => {
    return arrangements.filter((arrangement) =>
      Object.entries(appliedFilters).every(([field, value]) => {
        if (field === "isAvailable") {
          return value.toString() === "true"
            ? arrangement.isAvailable
            : !arrangement.isAvailable;
        }

        return arrangement[field].some(
          (item) => item.name.toLowerCase() === value.toLowerCase()
        );
      })
    );
  };

  const applyFilter = () => {
    setAppliedFilters((prev) => ({
      ...prev,
      [selectedFilter.field]: filterValue,
    }));
    setFilterValue("");
  };

  const removeFilter = (field) => {
    setAppliedFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[field];
      return newFilters;
    });
  };

  const renderSelectOptions = () => {
    if (!selectedFilter.field) return null;

    let data = filterData[selectedFilter.field];

    if (selectedFilter.field === "isAvailable") {
      return (
        <>
          <option value="">Seleccionar Disponibilidad</option>
          <option value={true}>Disponible</option>
          <option value={false}>No disponible</option>
        </>
      );
    }

    return (
      <>
        <option value="">Seleccionar {selectedFilter.name}</option>
        {data.map((item) => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </>
    );
  };

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" gap={4}>
      <Menu>
        <MenuButton
          as={Button}
          colorScheme={primaryColorScheme}
          minWidth="175px"
        >
          Seleccionar filtro
        </MenuButton>
        <MenuList>
          {filters.map((filter) => (
            <MenuItem
              key={filter.name}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      {selectedFilter.field && (
        <>
          <Select
            placeholder=""
            width="auto"
            value={filterValue || ""}
            onChange={(e) => setFilterValue(e.target.value)}
          >
            {renderSelectOptions()}
          </Select>
          <Button onClick={applyFilter} isDisabled={!filterValue}>
            Aplicar filtro
          </Button>
        </>
      )}
      <Box>
        {Object.entries(appliedFilters).map(([field, value]) => (
          <Tag
            size="lg"
            key={field}
            borderRadius="full"
            variant="solid"
            colorScheme="cyan"
            m={1}
          >
            <TagLabel>
              {LANG(field)}:{" "}
              {selectedFilter.field === "isAvailable" ? LANG(value) : value}
            </TagLabel>
            <TagCloseButton onClick={() => removeFilter(field)} />
          </Tag>
        ))}
      </Box>
    </Box>
  );
}

export default ArrangementsFilter;
