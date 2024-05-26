import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Input,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { createLookupEntityPayload } from "../../../core/helpers/web-api-client.helper.ts";
import { LANG } from "../../../core/helpers/translations.helper.ts";
import { AutocompleteSelect } from "../../../components/shared/AutocompleteSelect.jsx";
import {
  useGetQuery,
  usePostQuery,
} from "../../../core/hooks/useApiClientHooks.tsx";
import { IoMdAdd } from "react-icons/io";
import {
  cancelChangesText,
  createColorScheme,
  saveColorScheme,
} from "../../../core/constants.ts";

function CreateEntity({
  title,
  entityName,
  entity,
  fatherEntityName,
  refetch,
  ...props
}) {
  const [properties, setProperties] = useState({ ...entity });
  const [selectedItem, setSelectedItem] = useState([]);
  const { data: fatherEntityData } = useGetQuery(fatherEntityName);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const { isSuccess, execute, isLoading } = usePostQuery(
    entityName,
    properties
  );

  useEffect(() => setProperties({ ...entity }), [entity]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      onClose();
    }
  }, [isSuccess]);

  const handleCreate = async (event) => {
    event.preventDefault();
    execute(createLookupEntityPayload(properties));
  };

  const isDisabled = () => {
    return Object.entries(properties)
      .filter(([key]) => key !== "id")
      .some(([, value]) => value == null || value.trim() === "");
  };

  const handleSelectedItemChange = (selectedItem, property) => {
    if (selectedItem.length) {
      setSelectedItem(selectedItem);
      setProperties({
        ...properties,
        [property]: "" + selectedItem[0]?.value,
      });
    } else {
      setSelectedItem([]);
      setProperties({
        ...properties,
        [property]: "",
      });
    }
  };

  return (
    <>
      <Button
        colorScheme={createColorScheme}
        onClick={onOpen}
        display={{ base: "none", md: "flex" }}
        {...props}
      >
        {title}
      </Button>
      <IconButton
        colorScheme={createColorScheme}
        onClick={onOpen}
        icon={<IoMdAdd />}
        size="md"
        display={{ base: "flex", md: "none" }}
        {...props}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="xl" fontWeight="bold">
              <b>{title}</b>
            </AlertDialogHeader>
            <AlertDialogBody>
              {Object.keys(properties)
                .filter(
                  (property) =>
                    property !== "id" && property !== fatherEntityName
                )
                .map((property, index) => (
                  <Box key={property + entity.id} width="100%">
                    <Box mb={1} mt={index !== 0 ? 5 : 0} display="flex">
                      <label htmlFor={property}>{LANG(property)}:</label>
                    </Box>
                    {property.toString().includes("Id") ? (
                      <>
                        <AutocompleteSelect
                          _items={fatherEntityData.map((item) => ({
                            value: item.id,
                            label: item.name,
                          }))}
                          onChange={(e) =>
                            handleSelectedItemChange(e, property)
                          }
                          selectedItem={selectedItem}
                        />
                      </>
                    ) : (
                      <Input
                        id={property}
                        size={{ base: "md", md: "lg" }}
                        value={properties[property] ?? ""}
                        onChange={(e) =>
                          setProperties({
                            ...properties,
                            [property]: e.target.value,
                          })
                        }
                      />
                    )}
                  </Box>
                ))}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} isDisabled={isLoading}>
                {cancelChangesText}
              </Button>
              <Button
                isLoading={isLoading}
                ml={3}
                colorScheme={saveColorScheme}
                onClick={handleCreate}
                isDisabled={isDisabled()}
              >
                Guardar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default CreateEntity;
