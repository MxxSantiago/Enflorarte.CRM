import React, { useEffect } from "react";
import { Tag, Box, IconButton } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useDeleteQuery } from "../../../../../core/hooks/useApiClientHooks";

const TagTemplate = ({ tag, refetch, setIsEditing, setTagToEdit }) => {
  const { isSuccess, deleteEntity, isLoading } = useDeleteQuery("tag", tag.id);

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
      color="white"
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
          color="white"
          variant="ghost"
          icon={<FaEdit />}
          onClick={() => handleEdit()}
        ></IconButton>
        <IconButton
          size="xs"
          color="white"
          variant="ghost"
          icon={<MdDeleteOutline />}
          onClick={() => deleteEntity()}
          isDisabled={isLoading}
        ></IconButton>
      </Box>
    </Tag>
  );
};

export default TagTemplate;
