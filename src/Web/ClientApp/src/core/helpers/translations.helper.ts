﻿/**
 * Translations object containing key-value pairs for different translations.
 */
const translations = {
  name: "Nombre",
  flowerid: "Flor",
  flower: "Flor",
  flowervariant: "Variante de flor",
  flowervariants: "Variante de flor",
  address: "Dirección",
  phonenumber: "Teléfono",
  communicationtype: "Tipo de comunicación",
  communicationtypeid: "Tipo de comunicación",
  deliverytype: "Tipo de entrega",
  link: "Enlace",
  wrapperid: "Envoltura",
  wrapper: "Envoltura",
  wrappervariant: "Variante de envoltura",
  wrappervariants: "Variante de envoltura",
  client: "Cliente",
  clientid: "Cliente",
  branch: "Sucursal",
  branchid: "Sucursal",
  responsible: "Responsable",
  arrangement: "Arreglo",
  arrangementtype: "Tipo de arreglo",
  arrangementtypes: "Tipo de arreglo",
  isavailable: "Disponibilidad",
  true: "Disponible",
  false: "No disponible",
  pending: "Pendiente",
  inprogress: "En progreso",
  ready: "Listo",
  delivered: "Entregado",
  cancelled: "Cancelado",
  paid: "Pagado",
};

export function LANG(word) {
  return translations[word.toLowerCase()] || word;
}
