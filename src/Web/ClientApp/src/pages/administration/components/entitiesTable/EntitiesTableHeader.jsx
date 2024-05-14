import { Thead, Tr, Th, useColorMode } from "@chakra-ui/react";
import { LANG } from "../../../../core/helpers/translations.helper.ts";

const EntitiesTableHeader = ({ entity }) => {
  const { colorMode } = useColorMode();
  const backgroundColor = { light: "white", dark: "gray.800" }[colorMode];

  return (
    <Thead position="sticky" top="0" bg={backgroundColor} zIndex="1">
      <Tr>
        {Object.keys(entity)
          .filter((key) => key.toLowerCase().indexOf("id") === -1)
          .map((key) => (
            <Th w={"100%"} key={key}>
              {LANG(key)}
            </Th>
          ))}
        <Th w={"100%"}></Th>
      </Tr>
    </Thead>
  );
};

export default EntitiesTableHeader;
