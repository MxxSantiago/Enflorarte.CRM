import {
  BranchClient,
  ClientClient,
  CommunicationTypeClient,
  DeliveryTypeClient,
  FlowerClient,
  FlowerVariantClient,
  ResponsibleClient,
  WrapperClient,
  WrapperVariantClient,
} from "../web-api-client.ts";

function selectClient(entityName: string) {
  switch (entityName.trim()) {
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

interface masterEntityCreateArgs {
  name: string;
}

interface variantEntityCreateArgs {
  masterId: number;
  name: string;
}

interface masterEntityUpdateArgs {
  id: number;
  name: string;
}

interface variantEntityUpdateArgs {
  id: number;
  masterId: number;
  name: string;
}

export function getAllEntities(entityName: string) {
  return executeCrudMethod(entityName, "GetAll");
}

export function getEntity(entityName: string, id: number) {
  return executeCrudMethod(entityName, "Get", id);
}

export function deleteEntity(entityName: string, id: number) {
  return executeCrudMethod(entityName, "Delete", id);
}

export function updateEntity(entityName: string, args: any) {
  switch (entityName) {
    case "branch":
    case "client":
    case "communication":
    case "deliveryType":
    case "responsible":
    case "wrapper":
    case "flower":
      return executeCrudMethod(
        entityName,
        "Put",
        args as masterEntityUpdateArgs
      );
    case "flowerVariant":
    case "wrapperVariant":
      return executeCrudMethod(
        entityName,
        "Put",
        args as variantEntityUpdateArgs
      );
    default:
      throw new Error("Invalid entity name");
  }
}

export function createEntity(entityName: string, args: any) {
  switch (entityName) {
    case "branch":
    case "client":
    case "communication":
    case "deliveryType":
    case "responsible":
    case "wrapper":
    case "flower":
      return executeCrudMethod(
        entityName,
        "Post",
        args as masterEntityCreateArgs
      );
    case "flowerVariant":
    case "wrapperVariant":
      return executeCrudMethod(
        entityName,
        "Post",
        args as variantEntityCreateArgs
      );
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
    return await client[entityName + "_" + methodName](...args);
  } else {
    throw new Error(
      `Method ${
        entityName + "_" + methodName
      } does not exist on ${entityName}Client`
    );
  }
}
