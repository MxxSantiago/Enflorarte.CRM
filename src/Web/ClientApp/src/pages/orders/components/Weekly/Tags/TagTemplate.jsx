import React, { useEffect } from "react";
import { Tag, Box, IconButton } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useDeleteQuery } from "../../../../../core/hooks/useApiClientHooks.tsx";
import { getAppropiateTextColor } from "../../../../../core/helpers/adjustColor.helper.ts";

const TagTemplate = ({ tag, refetch, setIsEditing, setTagToEdit }) => {
  const { isSuccess, execute, isLoading } = useDeleteQuery("tag", tag.id);
  const textColor = getAppropiateTextColor(tag.color);

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  const handleEdit = () => {
    setTagToEdit(tag);
    setIsEditing(true);
  };

  return (
    <Tag
      color={textColor}
      size="lg"
      variant="solid"
      bg={tag.color}
      w="100%"
      mb={2}
      alignContent="center"
    >
      {tag.name}
      <Box display="flex" marginLeft="auto">
        <IconButton
          size="xs"
          mr={2}
          color={textColor}
          variant="link"
          icon={<FaEdit />}
          onClick={() => handleEdit()}
        ></IconButton>
        <IconButton
          size="xs"
          color={textColor}
          variant="link"
          icon={<MdDeleteOutline />}
          onClick={() => execute()}
          isDisabled={isLoading}
        ></IconButton>
      </Box>
    </Tag>
  );
};

export default TagTemplate;
