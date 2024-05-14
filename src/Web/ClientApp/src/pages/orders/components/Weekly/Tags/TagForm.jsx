import React from "react";
import { Flex, Text, Input } from "@chakra-ui/react";

function TagForm({ tagName, tagColor, setTagName, setTagColor }) {
  return (
    <>
      <Flex flexDirection="column">
        <Text>Nombre de la Etiqueta</Text>
        <Input
          variant="outline"
          value={tagName}
          onChange={(e) => {
            setTagName(e.target.value);
          }}
        />
        <Text mt={2}>Color de la Etiqueta</Text>
        <input
          type="color"
          value={tagColor}
          onChange={(e) => {
            setTagColor(e.target.value);
          }}
        />
      </Flex>
    </>
  );
}

export default TagForm;