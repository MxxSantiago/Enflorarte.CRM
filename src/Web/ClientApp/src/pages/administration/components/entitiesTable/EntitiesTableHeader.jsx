import { Thead, Tr, Th } from "@chakra-ui/react";
import { LANG } from "../../../../core/helpers/translations.helper.ts";

const EntitiesTableHeader = ({ entity }) => (
  <Thead>
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

export default EntitiesTableHeader;
