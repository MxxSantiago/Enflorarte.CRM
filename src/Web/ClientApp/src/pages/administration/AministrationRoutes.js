import React from "react";
import EntityView from "./components/EntityView.jsx";
import EntityWithVariantView from "./components/EntityWithVariantView.jsx";
import {
  ArrangementType,
  Branch,
  Client,
  CommunicationType,
  DeliveryType,
  Flower,
  FlowerVariant,
  Responsible,
  Wrapper,
  WrapperVariant,
} from "../../web-api-client.ts";
import {
  FiHome,
  FiGift,
  FiPhone,
  FiPackage,
  FiUserCheck,
} from "react-icons/fi";
import { IoFlowerOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { Navigate } from "react-router-dom";

const administrationRoutes = [
  { path: "/", element: <Navigate to="branch" />, ignore: true },
  {
    name: "Sucursales",
    path: "branch",
    element: (
      <EntityView
        title="Crear Sucursal"
        entityName="branch"
        entity={new Branch().toJSON()}
      />
    ),
    icon: <FiHome />,
  },
  {
    name: "Tipo de Entrega",
    path: "deliverytype",
    element: (
      <EntityView
        title="Crear Tipo de Entrega"
        entityName="deliveryType"
        entity={new DeliveryType().toJSON()}
      />
    ),
    icon: <FiPackage />,
  },
  {
    name: "Comunicación",
    path: "communicationtype",
    element: (
      <EntityView
        title="Crear Tipo de Comunicación"
        entityName="communicationType"
        entity={new CommunicationType().toJSON()}
      />
    ),
    icon: <FiPhone />,
  },
  {
    name: "Responsables",
    path: "responsible",
    element: (
      <EntityView
        title="Crear Responsable"
        entityName="responsible"
        entity={new Responsible().toJSON()}
      />
    ),
    icon: <FiUserCheck />,
  },
  {
    name: "Clientes",
    path: "client",
    element: (
      <EntityView
        title="Crear Cliente"
        entityName="client"
        fatherEntityName="communicationType"
        entity={new Client()}
      />
    ),
    icon: <FaRegUser />,
  },
  {
    name: "Envolturas",
    path: "wrapper",
    element: (
      <EntityWithVariantView
        title="Crear Envoltura"
        variantTitle="Crear Nueva Variante"
        entityName="wrapper"
        variantName="wrapperVariant"
        entity={new Wrapper().toJSON()}
        variant={new WrapperVariant().toJSON()}
      />
    ),
    icon: <FiGift />,
  },
  {
    name: "Flores",
    path: "flower",
    element: (
      <EntityWithVariantView
        title="Crear Flor"
        variantTitle="Crear Nueva Variante"
        entityName="flower"
        variantName="flowerVariant"
        entity={new Flower().toJSON()}
        variant={new FlowerVariant().toJSON()}
      />
    ),
    icon: <IoFlowerOutline />,
  },
  {
    name: "Tipo de arreglos",
    path: "arrangementtype",
    element: (
      <EntityView
        title="Crear Tipo de Arreglo"
        entityName="arrangementType"
        entity={new ArrangementType().toJSON()}
      />
    ),
    icon: <IoFlowerOutline />,
  },
];

export default administrationRoutes;
