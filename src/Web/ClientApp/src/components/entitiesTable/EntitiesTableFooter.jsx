import { Tfoot, Button, Box } from "@chakra-ui/react";
import { LANG } from "../../core/helpers/translations.helper.ts";

const EntitiesTableFooter = ({
  totalPages,
  totalItems,
  currentPage,
  changePage,
  entityName,
}) => (
  <Tfoot>
    <Box ml={4} mt={4} mb={3}>
      {totalItems === 0 ? (
        <p>No hay {LANG(entityName)}(s) registradas</p>
      ) : null}
      <Button
        display={totalItems === 0 ? "none" : "auto"}
        isDisabled={totalItems === 0 || currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
        mr={2}
      >
        {"<"}
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
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
      ))}
      <Button
        display={totalItems === 0 ? "none" : "auto"}
        onClick={() => changePage(currentPage + 1)}
        mr={2}
        isDisabled={currentPage === totalPages || totalPages === 1}
      >
        {">"}
      </Button>
    </Box>
  </Tfoot>
);

export default EntitiesTableFooter;
