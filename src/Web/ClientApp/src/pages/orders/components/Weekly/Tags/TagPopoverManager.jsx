import {
  Box,
  Button,
  PopoverBody,
  PopoverFooter,
  Spinner,
} from "@chakra-ui/react";
import TagTemplate from "./TagTemplate";
import TagForm from "./TagForm";
import { useState, useEffect } from "react";
import { usePostQuery } from "../../../../../core/hooks/useApiClientHooks";
import { saveChangesText } from "../../../../../core/constants.ts";

const TagPopoverManager = ({
  tags,
  isLoading,
  refetch,
  setIsEditing,
  setTagToEdit,
}) => {
  const [properties, setProperties] = useState({
    name: "",
    color: "#000000",
  });
  const { postEntity, isSuccess, isPostLoading } = usePostQuery(
    "tag",
    properties
  );
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  useEffect(() => {
    setIsDisabled(
      properties.name === "" ||
        properties.color === "" ||
        isLoading ||
        isPostLoading
    );
  }, [properties]);

  return (
    <>
      <PopoverBody>
        <Box h="100%">
          <Box h="200px" overflow="auto">
            {isLoading ? (
              <Spinner />
            ) : (
              tags.map((item, index) => (
                <TagTemplate
                  key={index}
                  tag={item}
                  refetch={refetch}
                  setTagToEdit={setTagToEdit}
                  setIsEditing={setIsEditing}
                />
              ))
            )}
          </Box>
        </Box>
      </PopoverBody>
      <PopoverFooter>
        <TagForm
          tagName={properties.name}
          tagColor={properties.color}
          setProperties={setProperties}
        />
        <Box w="100%">
          <Button
            colorScheme="pink"
            size="sm"
            mt={3}
            w="100%"
            onClick={() => {
              postEntity(properties);
            }}
            isDisabled={isDisabled}
          >
            {saveChangesText}
          </Button>
        </Box>
      </PopoverFooter>
    </>
  );
};

export default TagPopoverManager;
