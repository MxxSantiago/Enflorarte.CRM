import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { IoPricetags } from "react-icons/io5";
import { useGetQuery } from "../../../../../core/hooks/useApiClientHooks";
import TagPopoverManager from "./TagPopoverManager";
import TagPopoverEditor from "./TagPopoverEditor";
import { useState } from "react";

const TagPopover = ({ colorMode, mode }) => {
  const { data: tags, isLoading, refetch } = useGetQuery("tag");
  const [tagToEdit, setTagToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          mr={5}
          icon={<IoPricetags />}
          variant={mode === "week" ? "solid" : "outline"}
          color={
            mode === "week"
              ? colorMode === "dark"
                ? "gray.200"
                : "gray.500"
              : colorMode === "dark"
              ? "gray.300"
              : "gray.600"
          }
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Gestionar Etiquetas</PopoverHeader>
        {isEditing ? (
          <TagPopoverEditor
            refetch={refetch}
            tag={tagToEdit}
            setIsEditing={setIsEditing}
          />
        ) : (
          <TagPopoverManager
            tags={tags}
            isLoading={isLoading}
            refetch={refetch}
            setIsEditing={setIsEditing}
            setTagToEdit={setTagToEdit}
          />
        )}
      </PopoverContent>
    </Popover>
  );
};

export default TagPopover;
