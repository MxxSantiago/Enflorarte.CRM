import { Box, Button } from "@chakra-ui/react";

const EntitiesTableFooter = ({
  totalPages,
  totalItems,
  currentPage,
  changePage,
}) => (
  <Box marginX={4} marginTop={2.5}>
    <Button
      isDisabled={totalItems === 0 || currentPage === 1}
      onClick={() => changePage(currentPage - 1)}
      mr={2}
    >
      {"<"}
    </Button>
    {Array.from({ length: 1 + (totalPages - 1) }, (_, i) => i + 1).map(
      (pageNumber) => (
        <Button
          isDisabled={currentPage === pageNumber}
          key={pageNumber}
          onClick={() => changePage(pageNumber)}
          variant={{
            base: currentPage === pageNumber ? "outline" : "base",
          }}
          mr={2}
        >
          {pageNumber}
        </Button>
      )
    )}
    <Button
      onClick={() => changePage(currentPage + 1)}
      mr={2}
      isDisabled={currentPage === totalPages || totalPages === 1}
    >
      {">"}
    </Button>
  </Box>
);

export default EntitiesTableFooter;
