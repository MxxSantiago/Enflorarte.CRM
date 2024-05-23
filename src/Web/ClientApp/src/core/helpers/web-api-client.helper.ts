import {
  ArrangementClient,
  ArrangementTypeClient,
  BranchClient,
  ClientClient,
  CommunicationTypeClient,
  DeliveryTypeClient,
  FlowerClient,
  FlowerVariantClient,
  OrderClient,
  ResponsibleClient,
  WrapperClient,
  WrapperVariantClient,
  TagClient,
} from "../../web-api-client.ts";

type MethodNames = "Post" | "Get" | "GetAll" | "Put" | "Delete";

class CacheManager {
  private cache: { [key: string]: any } = {};

  public getCachedResult(cacheKey: string, refresh: boolean) {
    if (!refresh && this.cache[cacheKey]) {
      return this.cache[cacheKey];
    }
  }

  public updateCache(cacheKey: string, value: any) {
    this.cache[cacheKey] = value;
  }

  public removeCache(cacheKey: string) {
    delete this.cache[cacheKey];
  }

  public addEntityToCache(cacheKey: string, entity: any) {
    this.cache[cacheKey] = [...this.cache[cacheKey], entity];
  }

  public removeEntityFromCache(cacheKey: string, id: number) {
    this.cache[cacheKey] = [
      ...this.cache[cacheKey].filter((entity: any) => entity.id !== id),
    ];
  }

  public updateEntityInCache(cacheKey: string, entity: any) {
    this.cache[cacheKey] = [
      ...this.cache[cacheKey].map((e: any) =>
        e.id === entity.id ? { ...e, ...entity } : e
      ),
    ];
  }

  public clearCache() {
    this.cache = {};
  }
}

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
    order: new OrderClient(),
    tag: new TagClient(),
  };

  constructor(private cacheManager = new CacheManager()) {}

  public async getAllEntities(
    entityName: string,
    removeReferences: boolean = false,
    refresh: boolean = false
  ) {
    const cacheKey = entityName;
    const cachedResult = this.cacheManager.getCachedResult(cacheKey, refresh);

    if (cachedResult) {
      return cachedResult;
    }

    const result = await this.executeHttpMethod(entityName, "GetAll");
    this.cacheManager.updateCache(cacheKey, result);

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
    const cachedResult = this.cacheManager.getCachedResult(cacheKey, refresh);

    if (cachedResult) {
      return cachedResult;
    }

    const result = await this.executeHttpMethod(entityName, "Get", id);
    this.cacheManager.updateCache(cacheKey, result);

    return result;
  }

  public deleteEntity = (entityName: string, id: number) => {
    this.executeHttpMethod(entityName, "Delete", id);
    this.cacheManager.removeCache(`${entityName}_${id}`);
    this.cacheManager.removeEntityFromCache(entityName, id);
  };

  public updateEntity = (entityName: string, args: any) => {
    this.executeHttpMethod(entityName, "Put", args);
    this.cacheManager.updateCache(`${entityName}_${args.id}`, args);
    this.cacheManager.updateEntityInCache(entityName, args);
  };

  public createEntity = async (
    entityName: string,
    args: any
  ): Promise<number> => {
    const id = await this.executeHttpMethod(entityName, "Post", args);
    this.cacheManager.updateCache(`${entityName}_${id}`, { ...args, id });
    this.cacheManager.addEntityToCache(entityName, { ...args, id });
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
        [key]: key.toLowerCase().indexOf("id") !== -1 && key !== "id" && key[key.toLowerCase().indexOf("id") - 1] === key[key.toLowerCase().indexOf("id") - 1].toUpperCase() ? Number(value) : value,
      }),
      {}
    ),
    id: 0,
  };
  removeReferenceIdProperties(payload);
  return payload;
}
