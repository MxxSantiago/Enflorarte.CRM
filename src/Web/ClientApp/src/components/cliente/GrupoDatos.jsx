import React from "react";
import { Box, Input } from "@chakra-ui/react";

function GrupoDatos({ label }) {
  return (
    <div>
      <Box mb={4} textAlign="center">
        <label htmlFor="nombre">{label}</label>
      </Box>
      <Input id="nombre" size="sm" width="20rem" />
    </div>
  );
}

export default GrupoDatos;
