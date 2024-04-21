import React, { useRef, useState } from "react";
import { useCombobox, useMultipleSelection } from "downshift";
import { matchSorter } from "match-sorter";
import Highlighter from "react-highlight-words";
import useDeepCompareEffect from "react-use/lib/useDeepCompareEffect";
import {
  Stack,
  Box,
  List,
  ListItem,
  ListIcon,
  Input,
  useColorMode,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

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
      <Box pb={4} mb={4}>
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

export default AutocompleteSelect;
