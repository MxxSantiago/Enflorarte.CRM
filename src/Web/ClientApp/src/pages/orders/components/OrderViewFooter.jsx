import { ButtonGroup, Tooltip, Box, Button } from "@chakra-ui/react";

const WeeklyOrdersFooter = ({ incrementWeek, decrementWeek, ...props }) => (
  <Box display="flex" marginLeft="auto" {...props}>
    <ButtonGroup isAttached variant="outline" marginLeft="auto">
      <Tooltip
        label="Retroceder una semana"
        fontSize="md"
        placement="bottom-start"
      >
        <Button colorScheme="gray" onClick={decrementWeek}>
          {"<"}
        </Button>
      </Tooltip>
      <Tooltip
        label="Avanzar una semana"
        fontSize="md"
        placement="bottom-start"
      >
        <Button colorScheme="gray" onClick={incrementWeek}>
          {">"}
        </Button>
      </Tooltip>
    </ButtonGroup>
  </Box>
);

export default WeeklyOrdersFooter;
