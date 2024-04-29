export function LANG(word: string) {
  switch (word.toLocaleLowerCase()) {
    case "name":
      return "Nombre";
    case "flowerid":
      return "Flor";
    case "flower":
      return "Flor";
    case "flowervariant":
    case "flowervariants":
      return "Variante de flor";
    case "address":
      return "Dirección";
    case "phonenumber":
      return "Teléfono";
    case "communicationtype":
    case "communicationtypeid":
      return "Tipo de comunicación";
    case "link":
      return "Enlace";
    case "wrapperid":
      return "Envoltura";
    case "wrapper":
      return "Envoltura";
    case "wrappervariant":
    case "wrappervariants":
      return "Variante de envoltura";
    case "client":
      return "Cliente";
    case "clientid":
      return "Cliente";
    case "branch":
      return "Sucursal";
    case "branchid":
      return "Sucursal";
    case "responsible":
      return "Responsable";
    case "arrangement":
      return "Arreglo";
    case "arrangementtype":
    case "arrangementtypes":
      return "Tipo de arreglo";
    case "isavailable":
      return "Disponibilidad";
    case "true":
      return "Disponible";
    case "false":
      return "No disponible";
    default:
      return word;
  }
}
