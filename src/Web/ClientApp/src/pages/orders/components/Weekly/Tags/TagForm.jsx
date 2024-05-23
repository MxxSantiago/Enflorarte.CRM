import { useState } from "react";
import { Flex, Text, Input } from "@chakra-ui/react";

function TagForm({ tagName, tagColor, setProperties }) {
  const [localColor, setLocalColor] = useState(tagColor);
  const [localName, setLocalName] = useState(tagName);

  const handleColorChange = (e) => {
    setLocalColor(e.target.value);
  };

  const handleNameChange = (e) => {
    setLocalName(e.target.value);
    setProperties((t) => ({ ...t, name: e.target.value }));
  };

  const handleBlur = () => {
    setProperties((t) => ({ ...t, name: localName, color: localColor }));
  };

  return (
    <Flex flexDirection="column">
      <Text>Nombre:</Text>
      <Input variant="outline" value={localName} onChange={handleNameChange} />
      <Text mt={2}>Color:</Text>
      <input
        type="color"
        value={localColor}
        onChange={handleColorChange}
        onBlur={handleBlur}
      />
    </Flex>
  );
}

export default TagForm;
