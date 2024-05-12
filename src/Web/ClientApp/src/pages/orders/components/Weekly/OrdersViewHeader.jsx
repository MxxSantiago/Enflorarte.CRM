import { useNavigate } from "react-router-dom";
import { Flex, Text, ButtonGroup, Tooltip, IconButton } from "@chakra-ui/react";
import { MdCalendarViewWeek, MdCalendarViewMonth } from "react-icons/md";
const OrdersViewHeader = ({ colorMode, mode }) => {
    const navigate = useNavigate();
  
    return (
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
          <Tooltip label="Pedidos por Mes" fontSize="md" placement="bottom-start">
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
      </Flex>
    );
  };

  export default OrdersViewHeader;