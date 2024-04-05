import EntityView from "./components/EntityView.jsx";
import {
  Branch,
  Client,
  CommunicationType,
  DeliveryType,
  Flower,
  Responsible,
  Wrapper,
} from "./web-api-client.ts";

const AppRoutes = [
  {
    index: true,
    element: (
      <EntityView
        titulo="Crear Nueva Sucursal"
        entityName="branch"
        entity={new Branch().toJSON()}
      />
    ),
  },
  {
    path: "/Sucursal",
    element: (
      <EntityView
        titulo="Crear Nueva Sucursal"
        entityName="branch"
        entity={new Branch().toJSON()}
      />
    ),
  },
  {
    path: "/TipoEntrega",
    element: (
      <EntityView
        titulo="Crear Tipo de Entrega"
        entityName="deliveryType"
        entity={new DeliveryType().toJSON()}
      />
    ),
  },
  {
    path: "/TipoComunicacion",
    element: (
      <EntityView
        titulo="Crear Tipo de Comunicación"
        entityName="communicationType"
        entity={new CommunicationType().toJSON()}
      />
    ),
  },
  {
    path: "/Responsable",
    element: (
      <EntityView
        titulo="Crear Nuevo Responsable"
        entityName="responsible"
        entity={new Responsible().toJSON()}
      />
    ),
  },
  {
    path: "/Cliente",
    element: (
      <EntityView
        titulo="Crear Nuevo Cliente"
        entityName="client"
        entity={new Client().toJSON()}
      />
    ),
  },
  {
    path: "/Envolturas",
    element: (
      <EntityView
        titulo="Crear Nueva Envoltura"
        entityName="wrapper"
        entity={new Wrapper().toJSON()}
      />
    ),
  },
  {
    path: "/Flor",
    element: (
      <EntityView
        titulo="Crear Nueva Flor"
        entityName="flower"
        entity={new Flower().toJSON()}
      />
    ),
  },
];

export default AppRoutes;
