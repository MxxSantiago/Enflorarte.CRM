import React from "react";
import { Tag, Box, IconButton, Text} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

function TagTemplate({tagName, tagColor}) {
  return (
    <>
      <Tag color="black "size="lg" variant="solid" bg={tagColor} w="100%" mb={2} alignContent="center">
        {tagName}
        <Box display="flex" marginLeft="auto">
          <IconButton
            size="xs"
            mr={2}
            variant="ghost"
            color="black"
            icon={<FaEdit />}
          ></IconButton>
          <IconButton
            size="xs"
            variant="ghost"
            color="black"
            icon={<MdDeleteOutline />}
          ></IconButton>
        </Box>
      </Tag>
    </>
  );
}

export default TagTemplate;
