import CrearCliente from "./components/cliente/CrearCliente";
import CrearEntidad from "./components/CrearEntidad";
import EditarElemento from "./components/EditarElemento";
import EditarCliente from "./components/cliente/EditarCliente";

const AppRoutes = [
  {
    index: true,
    element: (
      <CrearEntidad
        titulo="Crear Nueva Sucursal"
        entityName="branch"
        visibleName="Sucursal"
        label="Nombre de la Sucursal:"
        placeholder="Ingrese su nombre"
        rutaEditar="/EditarSucursal"
      />
    ),
  },
  {
    path: "/Sucursal",
    element: (
      <CrearEntidad
        titulo="Crear Nueva Sucursal"
        entityName="branch"
        visibleName="Sucursal"
        label="Nombre de la Sucursal:"
        placeholder="Ingrese su nombre"
        rutaEditar="/EditarSucursal"
      />
    ),
  },
  {
    path: "/TipoEntrega",
    element: (
      <CrearEntidad
        titulo="Crear Tipo de Entrega"
        entityName="deliveryType"
        visibleName="Tipo de Entrega"
        label="Nombre del tipo de entrega:"
        placeholder="Ingrese el tipo"
        rutaEditar="/EditarTipoEntrega"
      />
    ),
  },
  {
    path: "/TipoComunicacion",
    element: (
      <CrearEntidad
        titulo="Crear Tipo de Comunicación"
        entityName="communicationType"
        visibleName="Tipo de Comunicación"
        label="Nombre del tipo de Comunicación:"
        placeholder="Ingrese el tipo"
        label2="Enlace:"
        placeholder2="Ingresa el Enlace"
        rutaEditar="/EditarComunicacion"
      />
    ),
  },
  {
    path: "/Responsable",
    element: (
      <CrearEntidad
        titulo="Crear Nuevo Responsable"
        entityName="responsible"
        visibleName="Responsable"
        label="Nombre del responsable:"
        placeholder="Ingrese el nombre"
        rutaEditar="/EditarResponsable"
      />
    ),
  },
  { path: "/Cliente", element: <CrearCliente entityName="client" /> },
  {
    path: "/Envolturas",
    element: (
      <CrearEntidad
        titulo="Crear Nueva Envoltura"
        entityName="wrapper"
        visibleName="Envoltura"
        label="Nombre Envoltura:"
        placeholder="Nombre de la Envoltura"
        tituloVariante="Crear Nueva Variante"
        labelVariante="Nombre Variante Envoltura:"
        placeholderVariante="Ingrese el Nombre"
        tipoDropdown="Envoltura"
        rutaEditar="/EditarEnvoltura"
        rutaEditarVariante="/EditarEnvolturaVariante"
      />
    ),
  },
  {
    path: "/Flor",
    element: (
      <CrearEntidad
        titulo="Crear Nueva Flor"
        entityName="flower"
        visibleName="Flor"
        label="Nombre Flor:"
        placeholder="Nombre de la Flor"
        tituloVariante="Crear Nueva Variante"
        labelVariante="Nombre Variante de Flor:"
        placeholderVariante="Ingrese el Nombre"
        tipoDropdown="Flores"
        rutaEditar="/EditarFlor"
        rutaEditarVariante="/EditarFlorVariante"
      />
    ),
  },
  {
    path: "/EditarSucursal/:id",
    element: (
      <EditarElemento
        titulo="Sucursal"
        entityName="branch"
        nombreActual="la Sucursal"
        nombreNuevo="la Sucursal"
        variante={false}
        rutaRegresar="/Sucursal"
      />
    ),
  },
  {
    path: "/EditarTipoEntrega/:id",
    element: (
      <EditarElemento
        titulo="Tipo de Entrega"
        entityName={"deliveryType"}
        nombreActual="el Tipo de Entrega"
        nombreNuevo="el Tipo de Entrega"
        variante={false}
        rutaRegresar="/TipoEntrega"
      />
    ),
  },
  {
    path: "/EditarTipoArreglo/:id",
    element: (
      <EditarElemento
        titulo="Tipo de Arreglo"
        entityName={"arrangementType"}
        nombreActual="el Tipo de Arreglo"
        nombreNuevo="el Tipo de Arreglo"
        variante={false}
        rutaRegresar="/Arreglos"
      />
    ),
  },
  {
    path: "/EditarTipoComunicacion/:id",
    element: (
      <EditarElemento
        titulo="Tipo de Comunicación"
        entityName={"communicationType"}
        nombreActual="el Tipo de Comunicación"
        nombreNuevo="el Tipo de Comunicación"
        variante={false}
        rutaRegresar="/TipoComunicacion"
      />
    ),
  },
  {
    path: "/EditarResponsable/:id",
    element: (
      <EditarElemento
        titulo="Responsable"
        entityName={"responsible"}
        nombreActual="el Responsable"
        nombreNuevo="el Responsable"
        variante={false}
        rutaRegresar="/Responsable"
      />
    ),
  },
  {
    path: "/EditarCliente/:id",
    element: <EditarCliente />,
  },
  {
    path: "/EditarEnvoltura/:id",
    element: (
      <EditarElemento
        titulo="Envoltura"
        entityName="wrapper"
        nombreActual="la Envoltura"
        nombreNuevo="la Envoltura"
        variante={false}
        rutaRegresar="/Envolturas"
      />
    ),
  },
  {
    path: "/EditarEnvolturaVariante/:id",
    element: (
      <EditarElemento
        titulo="Variante de Envoltura"
        entityName={"wrapperVariant"}
        nombreActual="la Variante de Envoltura"
        nombreNuevo="la Variante de Envoltura"
        tipoActual="Tipo de Envoltura"
        tipoNuevo="Tipo de Envoltura"
        variante={true}
        rutaRegresar="/Envolturas"
      />
    ),
  },
  {
    path: "/EditarFlor/:id",
    element: (
      <EditarElemento
        titulo="Flor"
        entityName="flower"
        nombreActual="la Flor"
        nombreNuevo="la Flor"
        variante={false}
        rutaRegresar="/Flor"
      />
    ),
  },
  {
    path: "/EditarFlorVariante/:id",
    element: (
      <EditarElemento
        titulo="Variante de Flor"
        entityName={"flowerVariant"}
        nombreActual="la Flor"
        nombreNuevo="la Flor"
        tipoActual="Tipo de Flor"
        tipoNuevo="Tipo de Flor"
        variante={true}
        rutaRegresar="/Flor"
      />
    ),
  },
  {
    path: "/EditarComunicacion/:id",
    element: (
      <EditarElemento
        titulo="Comunicación"
        entityName="communicationType"
        nombreActual="la Comunicación"
        nombreNuevo="la Comunicación"
        variante={false}
        rutaRegresar="/TipoComunicacion"
      />
    ),
  },
];

export default AppRoutes;
