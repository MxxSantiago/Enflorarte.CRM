import React from "react";
import Alta4Campos from "./Alta4Campos.jsx";
import { Box } from "@chakra-ui/react";
import Tabla from "../tabla/Tabla.jsx";

function CrearCliente({ entityName }) {
  return (
    <Box flexDirection="column">
      <Alta4Campos
        titulo="Crear Nuevo Cliente"
        label1="Nombre del Cliente:"
        pholder1="Ingrese el Nombre"
        label2="Dirección del Cliente:"
        pholder2="Ingresa la dirección"
        label3="Número del Cliente:"
        pholder3="Ingrese el número"
        label4="Tipo de Comunicación:"
        pholder4="Ingresa el tipo de comunicación"
      />
      <Tabla entityName={entityName} toEdit="/EditarCliente" margen="12rem" />
    </Box>
  );
}

export default CrearCliente;
