import {
    ArrangementTypeClient,
    BranchClient,
    ClientClient,
    CommunicationTypeClient,
    DeliveryTypeClient,
    FlowerClient,
    FlowerVariantClient,
    ResponsibleClient,
    WrapperClient,
    WrapperVariantClient,
} from "../../web-api-client.ts";

function selectClient(entityName: string) {
    switch (entityName.trim()) {
        case "arrangementType":
            return new ArrangementTypeClient();
        case "branch":
            return new BranchClient();
        case "client":
            return new ClientClient();
        case "communicationType":
            return new CommunicationTypeClient();
        case "deliveryType":
            return new DeliveryTypeClient();
        case "flower":
            return new FlowerClient();
        case "flowerVariant":
            return new FlowerVariantClient();
        case "responsible":
            return new ResponsibleClient();
        case "wrapper":
            return new WrapperClient();
        case "wrapperVariant":
            return new WrapperVariantClient();
        default:
            throw new Error("Invalid entity name");
  }
}

type MethodNames = "Post" | "Get" | "GetAll" | "Put" | "Delete";

export async function getAllEntities(
  entityName: string,
  removeReferences: boolean = false
) {
  const result = await executeCrudMethod(entityName, "GetAll");

  if (removeReferences) {
    result.forEach((entity) => removeReferenceIdProperties(entity));
  }

  return result;
}

export function removeReferenceIdProperties(payload: any) {
  const idProperties = Object.keys(payload)
    .filter((key) => key.indexOf("Id") !== -1 && key !== "id")
    .map((key) => key.replace("Id", ""));

  const payloadCopy = { ...payload };

  const newPayload = Object.entries(payloadCopy)
    .filter(([key]) => !idProperties.includes(key))
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

  return newPayload;
}

export function removeReferenceObjectProperties(payload: any) {
  const idProperties = Object.keys(payload)
    .filter((key) => key.endsWith("Id"))
    .map((key) => key.replace("Id", ""));

  const payloadCopy = { ...payload };

  const newPayload = Object.entries(payloadCopy)
    .filter(([key]) => !idProperties.includes(key))
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

  return newPayload;
}

export function createEntityPayload(properties: any) {
  const payload = {
    ...Object.entries(properties).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: key.toLowerCase().indexOf("id") !== -1 ? Number(value) : value,
      }),
      {}
    ),
    id: 0,
  };
  removeReferenceIdProperties(payload);
  return payload;
}

export function getEntity(entityName: string, id: number) {
  return executeCrudMethod(entityName, "Get", id);
}

export function deleteEntity(entityName: string, id: number) {
  return executeCrudMethod(entityName, "Delete", id);
}

export function updateEntity(entityName: string, args: any) {
  switch (entityName) {
    case "arrangementType":
    case "branch":
    case "client":
    case "communicationType":
    case "deliveryType":
    case "responsible":
    case "wrapper":
    case "flower":
      return executeCrudMethod(entityName, "Put", args);
    case "flowerVariant":
    case "wrapperVariant":
      return executeCrudMethod(entityName, "Put", args);
    default:
      throw new Error("Invalid entity name");
  }
}

export function createEntity(entityName: string, args: any) {
  switch (entityName) {
    case "arrangementType":
    case "branch":
    case "client":
    case "communicationType":
    case "deliveryType":
    case "responsible":
    case "wrapper":
    case "flower":
      return executeCrudMethod(entityName, "Post", args);
    case "flowerVariant":
    case "wrapperVariant":
      return executeCrudMethod(entityName, "Post", args);
    default:
      throw new Error("Invalid entity name");
  }
}

async function executeCrudMethod(
  entityName: string,
  methodName: MethodNames,
  ...args: any[]
) {
  const client = selectClient(entityName);
  if (typeof client[entityName + "_" + methodName] === "function") {
    if (methodName === "Put") {
      const { id } = args[0];
      return await client[entityName + "_" + methodName](id, ...args);
    }
    return await client[entityName + "_" + methodName](...args);
  } else {
    throw new Error(
      `Method ${
        entityName + "_" + methodName
      } does not exist on ${entityName}Client`
    );
  }
}
