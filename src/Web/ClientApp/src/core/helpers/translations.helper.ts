export function LANG(property: string) {
  switch (property.toLocaleLowerCase()) {
    case "name":
      return "Nombre";
    case "flowerid":
      return "Flor";
    case "flower":
      return "Flor";
    case "flowervariant":
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
    default:
      return property;
  }
}
