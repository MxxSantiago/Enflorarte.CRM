import { useNavigate } from "react-router-dom";
import {
  Flex,
  Text,
  ButtonGroup,
  Tooltip,
  IconButton,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
} from "@chakra-ui/react";
import { MdCalendarViewWeek, MdCalendarViewMonth } from "react-icons/md";
import { IoPricetags } from "react-icons/io5";
import TagTemplate from "./Tags/TagTemplate";
import TagForm from "./Tags/TagForm";
import { useState, useEffect } from "react";

const OrdersViewHeader = ({ colorMode, mode }) => {
  const navigate = useNavigate();
  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState("#000000");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTagName("");
    setTagColor("#000000");
  }, [tags]);

  return (
    <>
      <Flex
        paddingTop="1rem"
        paddingX="3rem"
        marginBottom="1rem"
        width="100%"
        alignItems="center"
      >
        <Flex alignItems="center">
          <Text
            fontSize={{
              base: "xl",
              sm: "2xl",
              md: "3xl",
            }}
            fontWeight="bold"
            color={colorMode === "dark" ? "gray.300" : "gray.600"}
            width="fit-content"
            margin={0}
          >
            Pedidos
          </Text>
          <Text
            fontSize={{
              base: "md",
              sm: "lg",
              md: "xl",
            }}
            color={colorMode === "dark" ? "gray.300" : "gray.600"}
            margin={0}
            marginLeft=".75rem"
            marginTop={".25rem"}
          >
            {"(Entregas de " +
              {
                week: "la semana",
                month: "el mes",
              }[mode] +
              ")"}
          </Text>
        </Flex>
        <Box display="flex" marginLeft="auto">
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
              <PopoverHeader>Gestor de Etiquetas</PopoverHeader>
              <PopoverBody>
                <Box h="100%">
                  <Box h="200px" overflow="auto">
                    {tags.map((item, index) => (
                      <TagTemplate
                        key={index}
                        tagName={item.nombre}
                        tagColor={item.color}
                      />
                    ))}
                  </Box>
                </Box>
              </PopoverBody>
              <PopoverFooter>
                <TagForm tagName={tagName} tagColor={tagColor} setTagName={setTagName} setTagColor={setTagColor}/>
                <Box w="100%">
                  <Button
                    colorScheme="pink"
                    size="sm"
                    mt={3}
                    w="100%"
                    onClick={() => {
                      setTags([...tags, { nombre: tagName, color: tagColor }]);
                    }}
                  >
                    Guardar
                  </Button>
                </Box>
              </PopoverFooter>
            </PopoverContent>
          </Popover>

          <ButtonGroup isAttached variant="outline" marginLeft="auto">
            <Tooltip
              label="Pedidos por semana"
              fontSize="md"
              placement="bottom-start"
            >
              <IconButton
                icon={<MdCalendarViewWeek />}
                variant={mode === "week" ? "solid" : "outline"}
                onClick={() => navigate("/week")}
                color={
                  mode === "week"
                    ? colorMode === "dark"
                      ? "gray.200"
                      : "gray.500"
                    : colorMode === "dark"
                    ? "gray.300"
                    : "gray.600"
                }
                colorScheme="gray"
              />
            </Tooltip>
            <Tooltip
              label="Pedidos por Mes"
              fontSize="md"
              placement="bottom-start"
            >
              <IconButton
                title="Pedidos por mes"
                icon={<MdCalendarViewMonth />}
                variant={mode === "month" ? "solid" : "outline"}
                onClick={() => navigate("/month")}
                color={
                  mode === "week"
                    ? colorMode === "dark"
                      ? "gray.200"
                      : "gray.500"
                    : colorMode === "dark"
                    ? "gray.300"
                    : "gray.600"
                }
                colorScheme="gray"
              />
            </Tooltip>
          </ButtonGroup>
        </Box>
      </Flex>
    </>
  );
};

export default OrdersViewHeader;
