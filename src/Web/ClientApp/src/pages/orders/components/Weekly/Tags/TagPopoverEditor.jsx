import { Button, PopoverBody, PopoverFooter } from "@chakra-ui/react";
import TagForm from "./TagForm";
import { useState, useEffect } from "react";
import { usePutQuery } from "../../../../../core/hooks/useApiClientHooks.tsx";
import {
  cancelChangesText,
  saveChangesText,
} from "../../../../../core/constants.ts";

const TagPopoverEditor = ({ tag, refetch, setIsEditing }) => {
  const [properties, setProperties] = useState({
    id: tag.id,
    name: tag.name,
    color: tag.color,
  });
  const { execute, isSuccess, isLoading } = usePutQuery("tag", properties);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      setIsEditing(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    setIsDisabled(
      properties.name === "" || properties.color === "" || isLoading
    );
  }, [properties]);

  return (
    <>
      <PopoverBody>
        <TagForm
          tagName={properties.name}
          tagColor={properties.color}
          setProperties={setProperties}
        />
      </PopoverBody>
      <PopoverFooter display="flex" justifyContent="space-between">
        <Button
          colorScheme="pink"
          size="sm"
          w="49%"
          onClick={() => {
            execute(properties);
          }}
          isDisabled={isDisabled}
        >
          {saveChangesText}
        </Button>
        <Button
          size="sm"
          w="49%"
          onClick={() => {
            setIsEditing(false);
          }}
          isDisabled={isDisabled}
        >
          {cancelChangesText}
        </Button>
      </PopoverFooter>
    </>
  );
};

export default TagPopoverEditor;
