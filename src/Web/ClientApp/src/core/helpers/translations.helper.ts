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
};

export function LANG(word) {
  return translations[word.toLowerCase()] || word;
}
