import { Box, Grid, GridItem } from "@chakra-ui/react";
import Alta from "./Alta.jsx";
import Alta2Campos from "./Alta2Campos";
import Tabla from "./tabla/Tabla.jsx";

const CrearEntidad = ({
  titulo,
  label,
  entityName,
  placeholder,
  tituloVariante,
  labelVariante,
  placeholderVariante,
  tipoDropdown,
  rutaEditar,
  rutaEditarVariante,
}) => {
  return (
    <Box>
      {tituloVariante ? (
        <Grid
          templateColumns={{ base: "1fr 1fr" }}
          gap={10}
          px={{ base: 4, md: 0 }}
        >
          <GridItem>
            <div>
              <div>
                <Alta titulo={titulo} label={label} pholder={placeholder} />
              </div>
              <div>
                <Tabla toEdit={rutaEditar} />
              </div>
            </div>
          </GridItem>
          <GridItem>
            <Alta2Campos
              titulo={tituloVariante}
              label1={labelVariante}
              pholder1={placeholderVariante}
              label2={tipoDropdown}
              isDropdown={true}
            />
            <GridItem>
              <Tabla
                entityName={entityName}
                toEdit={rutaEditarVariante}
                margen="7rem"
              />
            </GridItem>
          </GridItem>
        </Grid>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          gap={5}
          px={{ base: 4, md: 8 }}
          pt={{
            base: 6,
          }}
        >
          <Alta
            titulo={titulo}
            label={label}
            pholder={placeholder}
            label2="Enlace"
            pholder2="Ingresa el Enlace"
          />
          <Tabla entityName={entityName} toEdit={rutaEditar} />
        </Box>
      )}
    </Box>
  );
};

export default CrearEntidad;
