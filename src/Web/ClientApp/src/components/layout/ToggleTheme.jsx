import { IconButton, useColorMode } from "@chakra-ui/react";
import { FaRegMoon } from "react-icons/fa";
import { FaRegSun } from "react-icons/fa";

const ToggleTheme = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      icon={colorMode === "light" ? <FaRegMoon /> : <FaRegSun />}
      colorScheme={colorMode === "light" ? "purple" : "yellow"}
      {...props}
    >
      Toggle {colorMode === "light" ? "Dark" : "Light"}
    </IconButton>
  );
};

export default ToggleTheme;
