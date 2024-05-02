import React, { useRef, useState, useEffect } from "react";
import { useCombobox, useMultipleSelection } from "downshift";
import { matchSorter } from "match-sorter";
import Highlighter from "react-highlight-words";
import useDeepCompareEffect from "react-use/lib/useDeepCompareEffect";
import {
  FormLabel,
  Text,
  Stack,
  Box,
  List,
  ListItem,
  ListIcon,
  Button,
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
  useColorMode,
} from "@chakra-ui/react";
import { CheckCircleIcon, ArrowDownIcon } from "@chakra-ui/icons";

/**
 * @extends UseMultipleSelectionProps<T> - Props from the useMultipleSelection hook.
 *
 * @property {T[]} items - An array of items for the autocomplete dropdown.
 * @property {string} placeholder - The placeholder text for the input field.
 * @property {string} [highlightItemBg] - Background color for the highlighted item in the dropdown.
 * @property {(items: T[], inputValue: string) => T[]} [optionFilterFunc] - Function to filter items based on input value.
 * @property {(item: T) => string | JSX.Element} [itemRenderer] - Custom renderer for each item in the dropdown.
 * @property {any} [inputStyleProps] - Additional style props for the input element.
 * @property {any} [tagStyleProps] - Additional style props for the selected tags.
 * @property {any} [listStyleProps] - Additional style props for the list (dropdown menu).
 * @property {() => any} [onClearAll] - Callback function when the "Clear All" button is clicked.
 * @property {any} [listItemStyleProps] - Additional style props for each item in the dropdown menu.
 * @property {(inputValue: string) => React.ReactNode} [emptyState] - Custom content to display when no items match the input.
 * @property {Omit<IconProps, 'name'> & { icon: IconProps['name'] | React.ComponentType }} [selectedIconProps] - Props for the icon indicating a selected item.
 * @property {React.ComponentType<IconProps>} [icon] - Custom icon component for the selected items.
 */

function defaultOptionFilterFunc(items, inputValue) {
  return matchSorter(items, inputValue, { keys: ["value", "label"] });
}

const AutocompleteSelectBase = (props) => {
  const {
    items,
    optionFilterFunc = defaultOptionFilterFunc,
    itemRenderer,
    placeholder,
    listStyleProps,
    inputStyleProps,
    selectedIconProps,
    listItemStyleProps,
    keyboardShortcuts = true,
    icon: CustomIcon,
    ...downshiftProps
  } = props;

  const [inputValue, setInputValue] = useState("");
  const [inputItems, setInputItems] = useState(items);

  const disclosureRef = useRef(null);

  const { colorMode } = useColorMode();
  const borderColor = colorMode === "dark" ? "whiteAlpha.400" : "gray.300";

  const {
    getDropdownProps,
    setSelectedItems,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection(downshiftProps);
  const selectedItemValues = selectedItems.map((item) => item.value);

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    openMenu,
    selectItem,
    setHighlightedIndex,
    closeMenu,
  } = useCombobox({
    inputValue,
    selectedItem: undefined,
    items: inputItems,
    onInputValueChange: ({ inputValue, selectedItem }) => {
      const filteredItems = optionFilterFunc(items, inputValue || "");

      if (!selectedItem) {
        setInputItems(filteredItems);
      }
    },
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useCombobox.stateChangeTypes.InputBlur:
          return {
            ...changes,
            isOpen: false,
          };
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            highlightedIndex: state.highlightedIndex,
            inputValue,
            isOpen: true,
          };
        case useCombobox.stateChangeTypes.FunctionSelectItem:
          return {
            ...changes,
            inputValue,
          };
        default:
          return changes;
      }
    },
    onStateChange: ({ inputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue || "");
          break;
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          if (selectedItem) {
            if (selectedItemValues.includes(selectedItem.value)) {
              removeSelectedItem(selectedItem);
            } else {
              setSelectedItems([selectedItem]);
              setInputValue(selectedItem.label);
              closeMenu();
            }
            selectItem(null);
          }
          break;
        default:
          break;
      }
    },
  });

  useDeepCompareEffect(() => {
    setInputItems(items);
  }, [items]);

  function defaultItemRenderer(selected) {
    return selected.label;
  }

  const handleKeyDown = (e) => {
    if (keyboardShortcuts === false) return;

    if (e.key === "Escape") {
      if (isOpen) setInputValue("");
    } else if (e.key === "Enter") {
      if (highlightedIndex !== null) {
        const selectedItem = inputItems[highlightedIndex];
        if (selectedItem) {
          if (selectedItemValues.includes(selectedItem.value)) {
            removeSelectedItem(selectedItem);
          } else {
            setSelectedItems([selectedItem]);
            setInputValue(selectedItem.label);
          }
        }
      }
    } else if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex === null || prevIndex === inputItems.length - 1
          ? 0
          : prevIndex + 1
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) =>
        prevIndex === null || prevIndex === 0
          ? inputItems.length - 1
          : prevIndex - 1
      );
    } else if (e.key === "Tab") {
      if (isOpen && highlightedIndex === null) {
        setInputValue("");
      }
    } else if (e.key === "Backspace") {
      if (selectedItems.length > 0) {
        removeSelectedItem(selectedItems[selectedItems.length - 1]);
      }
    }
  };

  return (
    <Stack>
      <Stack {...getInputProps({ onFocus: () => openMenu() })}>
        <>
          <Input
            {...inputStyleProps}
            {...getInputProps(
              getDropdownProps({
                placeholder,
                onClick: isOpen ? () => {} : openMenu,
                onFocus: isOpen ? () => {} : openMenu,
                onKeyDown: handleKeyDown,
                ref: disclosureRef,
              })
            )}
            isDisabled={items.length === 0}
            value={selectedItems[0]?.label || inputValue}
            placeholder={selectedItems.length === 0 ? "---" : placeholder}
            readOnly={selectedItems.length > 0}
          />
        </>
      </Stack>
      <Box>
        <List
          bg={colorMode === "dark" ? "gray.700" : "white"}
          borderRadius="4px"
          border={isOpen && "1px solid rgba(0,0,0,0.1)"}
          borderColor={borderColor}
          boxShadow="6px 5px 8px rgba(0,50,30,0.02)"
          {...listStyleProps}
          {...getMenuProps()}
        >
          {isOpen &&
            inputItems.map((item, index) => (
              <ListItem
                userSelect="none"
                px={2}
                py={1}
                borderBottom="1px solid rgba(0,0,0,0.01)"
                bg={
                  highlightedIndex === index
                    ? colorMode === "dark"
                      ? "gray.600"
                      : "gray.200"
                    : "inherit"
                }
                _hover={{
                  bg: colorMode === "dark" ? "gray.600" : "gray.200",
                }}
                key={`${item.value}${index}`}
                {...getItemProps({ item, index })}
              >
                <Box display="inline-flex" alignItems="center">
                  {selectedItemValues.includes(item.value) && (
                    <ListIcon
                      as={CustomIcon || CheckCircleIcon}
                      color="green.500"
                      role="img"
                      display="inline"
                      aria-label="Selected"
                      {...selectedIconProps}
                    />
                  )}

                  {itemRenderer ? (
                    itemRenderer(item)
                  ) : (
                    <Highlighter
                      autoEscape={true}
                      searchWords={[inputValue || ""]}
                      textToHighlight={defaultItemRenderer(item)}
                    />
                  )}
                </Box>
              </ListItem>
            ))}
        </List>
      </Box>
    </Stack>
  );
};

function defaultCreateItemRenderer(value) {
  return (
    <Text>
      <Box as="span">Create</Box>{" "}
      <Box as="span" bg="yellow.300" fontWeight="bold">
        &quot;{value}&quot;
      </Box>
    </Text>
  );
}

const AutocompleteMultiSelect = (props) => {
  const {
    items,
    optionFilterFunc = defaultOptionFilterFunc,
    itemRenderer,
    placeholder,
    label,
    listStyleProps,
    labelStyleProps,
    inputStyleProps,
    toggleButtonStyleProps,
    tagStyleProps,
    selectedIconProps,
    listItemStyleProps,
    onClearAll,
    clearAll = false,
    keyboardShortcuts = true,
    onCreateItem,
    icon: CustomIcon,
    hideToggleButton = false,
    disableCreateItem = false,
    createItemRenderer = defaultCreateItemRenderer,
    renderCustomInput,
    ...downshiftProps
  } = props;

  const [isCreating, setIsCreating] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputItems, setInputItems] = useState(items);

  const disclosureRef = useRef(null);

  const { colorMode } = useColorMode(); // Check the color mode for the CUI instance (light or dark)
  const borderColor = colorMode === "dark" ? "whiteAlpha.400" : "gray.300";

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection(downshiftProps);
  const selectedItemValues = selectedItems.map((item) => item.value);

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    openMenu,
    selectItem,
    setHighlightedIndex,
  } = useCombobox({
    inputValue,
    selectedItem: undefined,
    items: inputItems,
    onInputValueChange: ({ inputValue, selectedItem }) => {
      const filteredItems = optionFilterFunc(items, inputValue || "");

      if (isCreating && filteredItems.length > 0) {
        setIsCreating(false);
      }

      if (!selectedItem) {
        setInputItems(filteredItems);
      }
    },
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useCombobox.stateChangeTypes.InputBlur:
          return {
            ...changes,
            isOpen: false,
          };
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            highlightedIndex: state.highlightedIndex,
            inputValue,
            isOpen: true,
          };
        case useCombobox.stateChangeTypes.FunctionSelectItem:
          return {
            ...changes,
            inputValue,
          };
        default:
          return changes;
      }
    },
    onStateChange: ({ inputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue || "");
          break;
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          if (selectedItem) {
            if (selectedItemValues.includes(selectedItem.value)) {
              removeSelectedItem(selectedItem);
            } else {
              if (onCreateItem && isCreating) {
                onCreateItem(selectedItem);
                setIsCreating(false);
                setInputItems(items);
                setInputValue("");
              } else {
                addSelectedItem(selectedItem);
              }
            }

            selectItem(null);
          }
          break;
        default:
          break;
      }
    },
  });

  const clearSelection = () => {
    setInputValue("");
    setInputItems(items);
    setHighlightedIndex(0);
    selectItem(null);
    onClearAll && onClearAll();
  };

  useEffect(() => {
    if (inputItems.length === 0 && !disableCreateItem) {
      setIsCreating(true);
      setInputItems([{ label: `${inputValue}`, value: inputValue }]);
      setHighlightedIndex(0);
    }
  }, [
    inputItems,
    setIsCreating,
    setHighlightedIndex,
    inputValue,
    disableCreateItem,
  ]);

  useDeepCompareEffect(() => {
    setInputItems(items);
  }, [items]);

  function defaultItemRenderer(selected) {
    return selected.label;
  }

  const handleKeyDown = (e) => {
    if (keyboardShortcuts === false) return;

    if (e.key === "Escape") {
      // Handle escape key (e.g., close dropdown)
      if (isOpen) {
        // Close the dropdown
        setInputValue("");
        setIsCreating(false);
      }
    } else if (e.key === "Enter") {
      // Handle enter key (e.g., select highlighted item or create new item)
      if (highlightedIndex !== null) {
        const selectedItem = inputItems[highlightedIndex];
        if (selectedItem) {
          if (selectedItemValues.includes(selectedItem.value)) {
            removeSelectedItem(selectedItem);
          } else {
            if (onCreateItem && isCreating) {
              onCreateItem(selectedItem);
              setIsCreating(false);
              setInputItems(items);
              setInputValue("");
            } else {
              addSelectedItem(selectedItem);
            }
          }
        }
      } else if (isCreating) {
        // Create a new item with the current input value
        const newItem = { label: inputValue, value: inputValue };
        if (onCreateItem) {
          onCreateItem(newItem);
          setInputValue("");
        }
      }
    } else if (e.key === "ArrowDown") {
      // Handle arrow down key (e.g., navigate to the next item)
      //@ts-ignore
      setHighlightedIndex((prevIndex) =>
        prevIndex === null || prevIndex === inputItems.length - 1
          ? 0
          : prevIndex + 1
      );
    } else if (e.key === "ArrowUp") {
      // Handle arrow up key (e.g., navigate to the previous item)
      //@ts-ignore
      setHighlightedIndex((prevIndex) =>
        prevIndex === null || prevIndex === 0
          ? inputItems.length - 1
          : prevIndex - 1
      );
    } else if (e.key === "Tab") {
      // Handle tab key (e.g., close dropdown if no item is highlighted)
      if (isOpen && highlightedIndex === null) {
        // Close the dropdown
        setInputValue("");
        setIsCreating(false);
      }
    }
  };

  return (
    <Stack
      border={
        colorMode === "dark"
          ? "1px solid rgba(255,255,255,0.1)"
          : "1px solid rgba(0,0,0,0.1)"
      }
      borderRadius="4px"
      p={2}
      {...downshiftProps}
    >
      {/* Label */}
      <FormLabel {...getLabelProps({ ...labelStyleProps })}>{label}</FormLabel>

      {/* Selected Tags */}
      {selectedItems && (
        <Stack spacing={2} isInline flexWrap="wrap">
          {selectedItems.map((selectedItem, index) => (
            <Tag
              mb={1}
              {...tagStyleProps}
              key={`selected-item-${index}`}
              {...getSelectedItemProps({ selectedItem, index })}
            >
              <TagLabel>{selectedItem.label}</TagLabel>
              <TagCloseButton
                onClick={(e) => {
                  e.stopPropagation();
                  removeSelectedItem(selectedItem);
                }}
                aria-label="Remove menu selection badge"
              />
            </Tag>
          ))}
        </Stack>
      )}

      {/* @ts-ignore - Input */}
      <Stack {...getInputProps({ onFocus: () => openMenu() })}>
        {renderCustomInput ? (
          renderCustomInput(
            {
              ...inputStyleProps,
              ...getInputProps(
                getDropdownProps({
                  placeholder,
                  onClick: isOpen ? () => {} : openMenu,
                  onFocus: isOpen ? () => {} : openMenu,
                  ref: disclosureRef,
                })
              ),
            },
            {
              ...toggleButtonStyleProps,
              ...getToggleButtonProps(),
              "aria-label": "toggle menu",
            }
          )
        ) : (
          <>
            <Input
              {...inputStyleProps}
              {...getInputProps(
                getDropdownProps({
                  placeholder,
                  onClick: isOpen ? () => {} : openMenu,
                  onFocus: isOpen ? () => {} : openMenu,
                  onKeyDown: handleKeyDown, // Attach the keyboard shortcut handler
                  ref: disclosureRef,
                })
              )}
            />
            {!hideToggleButton && (
              <Button
                {...toggleButtonStyleProps}
                {...getToggleButtonProps()}
                aria-label="toggle menu"
              >
                <ArrowDownIcon />
              </Button>
            )}
          </>
        )}
      </Stack>

      {/* Clear All Button */}
      {clearAll && selectedItems.length > 0 && (
        <Button onClick={clearSelection} variant="link" color="blue.500">
          Clear All
        </Button>
      )}

      {/* Menu Lists Component */}
      <Box pos="relative">
        <List
          bg={colorMode === "dark" ? "gray.700" : "white"}
          borderRadius="4px"
          border={isOpen && "1px solid rgba(0,0,0,0.1)"}
          borderColor={borderColor}
          boxShadow="6px 5px 8px rgba(0,50,30,0.02)"
          p={0}
          m={0}
          position="absolute"
          zIndex={1}
          width="100%"
          {...listStyleProps}
          {...getMenuProps()}
        >
          {isOpen &&
            inputItems.map((item, index) => (
              <ListItem
                px={2}
                py={1}
                borderBottom="1px solid rgba(0,0,0,0.01)"
                bg={
                  highlightedIndex === index
                    ? colorMode === "dark"
                      ? "gray.600"
                      : "gray.200"
                    : "inherit"
                }
                _hover={{
                  bg: colorMode === "dark" ? "gray.600" : "gray.200",
                }}
                key={`${item.value}${index}`}
                {...getItemProps({ item, index })}
              >
                {isCreating ? (
                  createItemRenderer(item.label)
                ) : (
                  <Box display="inline-flex" alignItems="center">
                    {selectedItemValues.includes(item.value) && (
                      <ListIcon
                        as={CustomIcon || CheckCircleIcon}
                        color="green.500"
                        role="img"
                        display="inline"
                        aria-label="Selected"
                        {...selectedIconProps}
                      />
                    )}

                    {itemRenderer ? (
                      itemRenderer(item)
                    ) : (
                      //@ts-expect-error This is a valid package but showing its not.
                      <Highlighter
                        autoEscape={true}
                        searchWords={[inputValue || ""]}
                        textToHighlight={defaultItemRenderer(item)}
                      />
                    )}
                  </Box>
                )}
              </ListItem>
            ))}
        </List>
      </Box>
    </Stack>
  );
};

// _items: Array<{ value: string; label: string }>
const AutocompleteSelect = ({
  _items = [],
  selectedItem,
  onChange,
  ...props
}) => (
  <Box pos={"relative"}>
    <AutocompleteSelectBase
      placeholder="---"
      items={_items}
      selectedItems={selectedItem}
      inputStyleProps={{
        size: "lg",
      }}
      onSelectedItemsChange={(changes) => {
        onChange(changes.selectedItems);
      }}
      listStyleProps={{
        p: 0,
        m: 0,
        position: "absolute",
        zIndex: 1,
        width: "100%",
      }}
      {...props}
    />
  </Box>
);

export { AutocompleteSelect, AutocompleteMultiSelect };
