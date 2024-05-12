import {
  ArrangementClient,
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

type MethodNames = "Post" | "Get" | "GetAll" | "Put" | "Delete";

class ApiClient {
  private clients = {
    arrangement: new ArrangementClient(),
    arrangementType: new ArrangementTypeClient(),
    branch: new BranchClient(),
    client: new ClientClient(),
    communicationType: new CommunicationTypeClient(),
    deliveryType: new DeliveryTypeClient(),
    flower: new FlowerClient(),
    flowerVariant: new FlowerVariantClient(),
    responsible: new ResponsibleClient(),
    wrapper: new WrapperClient(),
    wrapperVariant: new WrapperVariantClient(),
  };

  private clientCache: { [key: string]: any } = {};

  private getCachedResult(cacheKey: string, refresh: boolean) {
    if (!refresh && this.clientCache[cacheKey]) {
      return this.clientCache[cacheKey];
    }
  }

  public async getAllEntities(
    entityName: string,
    removeReferences: boolean = false,
    refresh: boolean = false
  ) {
    const cacheKey = entityName;
    const cachedResult = this.getCachedResult(cacheKey, refresh);

    if (cachedResult) {
      return cachedResult;
    }

    const result = await this.executeHttpMethod(entityName, "GetAll");
    this.clientCache[cacheKey] = result;
    if (removeReferences) {
      result.forEach((entity: any) => removeReferenceIdProperties(entity));
    }
    return result;
  }

  public async getEntity(
    entityName: string,
    id: number,
    refresh: boolean = false
  ) {
    const cacheKey = `${entityName}_${id}`;
    const cachedResult = this.getCachedResult(cacheKey, refresh);

    if (cachedResult) {
      return cachedResult;
    }

    const result = await this.executeHttpMethod(entityName, "Get", id);
    this.clientCache[cacheKey] = result;

    return result;
  }

  public deleteEntity = (entityName: string, id: number) =>
    this.executeHttpMethod(entityName, "Delete", id);

  public updateEntity = (entityName: string, args: any) =>
    this.executeHttpMethod(entityName, "Put", args);

  public createEntity = async (
    entityName: string,
    args: any
  ): Promise<number> => {
    const id = await this.executeHttpMethod(entityName, "Post", args);
    return id;
  };

  private async executeHttpMethod(
    entityName: string,
    methodName: MethodNames,
    ...args: any[]
  ) {
    if (!this.clients[entityName]) {
      throw new Error("Invalid entity name");
    }

    const client = this.clients[entityName];
    const method = client[`${entityName}_${methodName}`];

    if (typeof method === "function") {
      const boundMethod = method.bind(client);
      return methodName === "Put"
        ? await boundMethod(args[0].id, ...args)
        : await boundMethod(...args);
    } else {
      throw new Error(
        `Method ${entityName}_${methodName} does not exist on ${entityName}Client`
      );
    }
  }
}

export const apiClient = new ApiClient();

// Utils
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

export function createLookupEntityPayload(properties: any) {
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
