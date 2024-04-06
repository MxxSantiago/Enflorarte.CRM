import EntityView from "./components/EntityView.jsx";
import EntityWithVariantView from "./components/EntityWithVariantView.jsx";
import {
  Branch,
  Client,
  CommunicationType,
  DeliveryType,
  Flower,
  FlowerVariant,
  Responsible,
  Wrapper,
  WrapperVariant,
} from "./web-api-client.ts";

const AppRoutes = [
  {
    index: true,
    element: (
      <EntityView
        title="Crear Nueva Sucursal"
        entityName="branch"
        entity={new Branch().toJSON()}
      />
    ),
  },
  {
    path: "/Sucursal",
    element: (
      <EntityView
        title="Crear Nueva Sucursal"
        entityName="branch"
        entity={new Branch().toJSON()}
      />
    ),
  },
  {
    path: "/TipoEntrega",
    element: (
      <EntityView
        title="Crear Tipo de Entrega"
        entityName="deliveryType"
        entity={new DeliveryType().toJSON()}
      />
    ),
  },
  {
    path: "/TipoComunicacion",
    element: (
      <EntityView
        title="Crear Tipo de Comunicación"
        entityName="communicationType"
        entity={new CommunicationType().toJSON()}
      />
    ),
  },
  {
    path: "/Responsable",
    element: (
      <EntityView
        title="Crear Nuevo Responsable"
        entityName="responsible"
        entity={new Responsible().toJSON()}
      />
    ),
  },
  {
    path: "/Cliente",
    element: (
      <EntityView
        title="Crear Nuevo Cliente"
        entityName="client"
        fatherEntityName="communicationType"
        entity={new Client().toJSON()}
      />
    ),
  },
  {
    path: "/Envolturas",
    element: (
      <EntityWithVariantView
        title="Crear Nueva Envoltura"
        variantTitle="Crear Nueva Variante"
        entityName="wrapper"
        variantName="wrapperVariant"
        entity={new Wrapper().toJSON()}
        variant={new WrapperVariant().toJSON()}
      />
    ),
  },
  {
    path: "/Flor",
    element: (
      <EntityWithVariantView
        title="Crear Nueva Flor"
        variantTitle="Crear Nueva Variante"
        entityName="flower"
        variantName="flowerVariant"
        entity={new Flower().toJSON()}
        variant={new FlowerVariant().toJSON()}
      />
    ),
  },
];

export default AppRoutes;
