export function LANG(property: string) {
  switch (property.toLocaleLowerCase()) {
    case "name":
      return "Nombre";
    case "flowerid":
      return "Flor";
    case "flower":
      return "Flor";
    case "preferredaddress":
      return "Dirección preferida";
    case "phonenumber":
      return "Teléfono";
    case "preferredcommunicationtypeid":
      return "Tipo de comunicación preferida";
    case "link":
      return "Enlace";
    case "wrapperid":
      return "Envoltura";
    case "wrapper":
      return "Envoltura";
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
