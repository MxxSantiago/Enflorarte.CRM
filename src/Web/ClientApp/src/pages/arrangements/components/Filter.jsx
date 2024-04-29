import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
  Select,
} from "@chakra-ui/react";

function Filter({
  valueMenu,
  setValueMenu,
  arrangementTypeData,
  wrappingVariantData,
  flowerVariantData,
  filterValue,
  handleFilterChange,
}) {
  const handleMenuItemClick = (value) => {
    setValueMenu(value);
  };

  const renderSelectOptions = () => {
    switch (valueMenu) {
      case "":
        return null;
      case "Tipo de Arreglo":
        return (
          <>
            <option key="" value="">
              {""}
            </option>
            {arrangementTypeData.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </>
        );
      case "Variante de Flor":
        return (
          <>
            <option key="" value="">
              {""}
            </option>
            {flowerVariantData.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </>
        );
      case "Variante de Envoltura":
        return (
          <>
            <option key="" value="">
              {""}
            </option>
            {wrappingVariantData.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </>
        );
      case "Disponible":
        return (
          <>
            <option value={true}>Disponible</option>
          </>
        );
      case "No disponible":
        return (
          <>
            <option value={false}>No disponible</option>
          </>
        );
      default:
        return null;
    }
  };
  return (
    <Box display="flex" flexDirection="row" w="100%">
      <Menu>
        <MenuButton as={Button} colorScheme="pink">
          Filtrar por
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleMenuItemClick("")}>
            Sin filtro
          </MenuItem>

          <MenuItem onClick={() => handleMenuItemClick("Tipo de Arreglo")}>
            Tipo de Arreglo
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("Variante de Flor")}>
            Variante de Flor
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuItemClick("Variante de Envoltura")}
          >
            Variante de Envoltura
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("Disponible")}>
            Disponible
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("No disponible")}>
            No disponible
          </MenuItem>
        </MenuList>
      </Menu>
      <Select
        placeholder=""
        width="auto"
        ml={4}
        value={filterValue || ""}
        onChange={(e) => handleFilterChange(e.target.value)}
      >
        {renderSelectOptions()}
      </Select>
    </Box>
  );
}

export default Filter;
