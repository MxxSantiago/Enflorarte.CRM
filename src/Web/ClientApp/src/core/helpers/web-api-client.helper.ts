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
  AuthClient,
} from "../../web-api-client.ts";

type MethodNames = "Post" | "Get" | "GetAll" | "Put" | "Delete";

/**
 * Manages caching of data in memory.
 */
class CacheManager {
  private cache: { [key: string]: any } = {};

  /**
   * Retrieves the cached result for a given cache key.
   * @param cacheKey - The key used to identify the cached result.
   * @param refresh - Determines whether to refresh the cache or not.
   * @returns The cached result if it exists and `refresh` is `false`, otherwise `undefined`.
   */
  public getCachedResult(cacheKey: string, refresh: boolean) {
    if (!refresh && this.cache[cacheKey]) {
      return this.cache[cacheKey];
    }
  }

  /**
   * Updates the cache with a new value for a given cache key.
   * @param cacheKey - The key used to identify the cache entry.
   * @param value - The new value to be stored in the cache.
   */
  public updateCache(cacheKey: string, value: any) {
    this.cache[cacheKey] = value;
  }

  /**
   * Removes a cache entry for a given cache key.
   * @param cacheKey - The key used to identify the cache entry to be removed.
   */
  public removeCache(cacheKey: string) {
    delete this.cache[cacheKey];
  }

  /**
   * Adds an entity to the cache for a given cache key.
   * If the cache entry does not exist, it will be created.
   * @param cacheKey - The key used to identify the cache entry.
   * @param entity - The entity to be added to the cache.
   */
  public addEntityToCache(cacheKey: string, entity: any) {
    if (!this.cache[cacheKey]) {
      this.cache[cacheKey] = [];
    }
    this.cache[cacheKey] = [...this.cache[cacheKey], entity];
  }

  /**
   * Removes an entity from the cache for a given cache key and entity ID.
   * If the cache entry does not exist, it will be created.
   * @param cacheKey - The key used to identify the cache entry.
   * @param id - The ID of the entity to be removed from the cache.
   */
  public removeEntityFromCache(cacheKey: string, id: number) {
    if (!this.cache[cacheKey]) {
      this.cache[cacheKey] = [];
    }
    this.cache[cacheKey] = [
      ...this.cache[cacheKey].filter((entity: any) => entity.id !== id),
    ];
  }

  /**
   * Updates an entity in the cache for a given cache key.
   * If the cache entry does not exist, it will be created.
   * @param cacheKey - The key used to identify the cache entry.
   * @param entity - The updated entity to be stored in the cache.
   */
  public updateEntityInCache(cacheKey: string, entity: any) {
    if (!this.cache[cacheKey]) {
      this.cache[cacheKey] = [];
    }
    this.cache[cacheKey] = [
      ...this.cache[cacheKey].map((e: any) =>
        e.id === entity.id ? { ...e, ...entity } : e
      ),
    ];
  }

  /**
   * Clears the entire cache.
   */
  public clearCache() {
    this.cache = {};
  }
}

/**
 * Represents a client for making API requests.
 */
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
    auth: new AuthClient(),
  };

  constructor(private cacheManager = new CacheManager()) {}

  /**
   * Retrieves the current user.
   * @returns A promise that resolves to the current user.
   */
  public async getCurrentUser() {
    const user = await this.clients.auth.auth_GetCurrentUser();
    return user;
  }

  /**
   * Retrieves all entities of a given type.
   * @param entityName - The name of the entity type.
   * @param removeReferences - Optional. Specifies whether to remove reference ID properties from the entities. Default is false.
   * @param refresh - Optional. Specifies whether to refresh the cache. Default is false.
   * @returns A promise that resolves to an array of entities.
   */
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

  /**
   * Retrieves an entity by its ID.
   * @param entityName - The name of the entity type.
   * @param id - The ID of the entity.
   * @param refresh - Optional. Specifies whether to refresh the cache. Default is false.
   * @returns A promise that resolves to the entity.
   */
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

  /**
   * Deletes an entity by its ID.
   * @param entityName - The name of the entity type.
   * @param id - The ID of the entity.
   * @param customCacheKey - Optional. The custom cache key to use. If provided, it will be used instead of the default cache key.
   * @returns A promise that resolves to the result of the delete operation.
   */
  public deleteEntity = async (
    entityName: string,
    id: number,
    customCacheKey?: string
  ) => {
    const result = await this.executeHttpMethod(entityName, "Delete", id);

    if (customCacheKey) {
      this.cacheManager.removeCache(`${customCacheKey}_${id}`);
      this.cacheManager.removeEntityFromCache(customCacheKey, id);
    } else {
      this.cacheManager.removeCache(`${entityName}_${id}`);
      this.cacheManager.removeEntityFromCache(entityName, id);
    }

    return result;
  };

  /**
   * Updates an entity.
   * @param entityName - The name of the entity type.
   * @param args - The arguments for the update operation.
   * @param customCacheKey - Optional. The custom cache key to use. If provided, it will be used instead of the default cache key.
   * @returns A promise that resolves to the result of the update operation.
   */
  public updateEntity = async (
    entityName: string,
    args: any,
    customCacheKey?: string
  ) => {
    const result = await this.executeHttpMethod(entityName, "Put", args);

    if (customCacheKey) {
      this.cacheManager.updateCache(`${customCacheKey}_${args.id}`, args);
      this.cacheManager.updateEntityInCache(customCacheKey, args);
    } else {
      this.cacheManager.updateCache(`${entityName}_${args.id}`, args);
      this.cacheManager.updateEntityInCache(entityName, args);
    }

    return result;
  };

  /**
   * Creates a new entity.
   * @param entityName - The name of the entity type.
   * @param args - The arguments for the create operation.
   * @param customCacheKey - Optional. The custom cache key to use. If provided, it will be used instead of the default cache key.
   * @returns A promise that resolves to the ID of the created entity.
   */
  public createEntity = async (
    entityName: string,
    args: any,
    customCacheKey?: string
  ): Promise<number> => {
    const id = await this.executeHttpMethod(entityName, "Post", args);

    if (customCacheKey) {
      this.cacheManager.updateCache(`${customCacheKey}_${id}`, { ...args, id });
      this.cacheManager.addEntityToCache(customCacheKey, { ...args, id });
    } else {
      this.cacheManager.updateCache(`${entityName}_${id}`, { ...args, id });
      this.cacheManager.addEntityToCache(entityName, { ...args, id });
    }

    return id;
  };

  /**
   * Executes a custom method on an entity.
   * @param entityName - The name of the entity type.
   * @param customMethodName - The name of the custom method.
   * @param refresh - Optional. Specifies whether to refresh the cache. Default is false.
   * @param args - The arguments for the custom method.
   * @param cacheKey - The cache key for the custom method result.
   * @returns A promise that resolves to the result of the custom method.
   */
  public async executeCustomMethod(
    entityName: string,
    customMethodName: string,
    refresh: boolean = false,
    args: any,
    cacheKey: string
  ) {
    if (!this.clients[entityName]) {
      throw new Error("Invalid entity name");
    }

    const client = this.clients[entityName];
    const method = client[entityName + "_" + customMethodName];

    if (typeof method === "function") {
      const cachedResult = this.cacheManager.getCachedResult(cacheKey, refresh);

      if (cachedResult) {
        return cachedResult;
      }

      const boundMethod = method.bind(client);
      const result = await boundMethod(args);

      if (customMethodName.indexOf("Get") !== -1) {
        this.cacheManager.updateCache(cacheKey, result);
      }

      return result;
    } else {
      throw new Error(
        `Method ${customMethodName} does not exist on ${entityName}Client`
      );
    }
  }

  /**
   * Executes an HTTP method on the specified entity client.
   * @param entityName - The name of the entity.
   * @param methodName - The name of the method to execute.
   * @param args - Additional arguments to pass to the method.
   * @returns A promise that resolves to the result of the method execution.
   * @throws Error if the entity name is invalid or if the method does not exist on the entity client.
   */
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
      try {
        return methodName === "Put"
          ? await boundMethod(args[0].id, ...args)
          : await boundMethod(...args);
      } catch (err) {
        if (err.response) {
          const parsedError = JSON.parse(err.response);
          throw parsedError;
        } else {
          throw err;
        }
      }
    } else {
      throw new Error(
        `Method ${entityName}_${methodName} does not exist on ${entityName}Client`
      );
    }
  }
}

export const apiClient = new ApiClient();

// Utils

/**
 * Removes reference ID properties from the payload object.
 * @param payload - The payload object from which to remove reference ID properties.
 * @returns The new payload object without the reference ID properties.
 */
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

/**
 * Removes reference object properties from the payload.
 * @param payload - The payload object from which reference object properties will be removed.
 * @returns The new payload object without reference object properties.
 */
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

/**
 * Converts empty strings to null in an object.
 * @param obj - The object to convert.
 * @returns The object with empty strings converted to null.
 */
export function convertEmptyStringToNullInObject(obj: { [key: string]: any }): {
  [key: string]: any;
} {
  const newObj = { ...obj };

  Object.keys(newObj).forEach((key) => {
    if (newObj[key] === "") {
      newObj[key] = null;
    }
  });

  return newObj;
}

/**
 * Creates a payload for a lookup entity.
 * @param properties - The properties of the lookup entity.
 * @returns The payload object.
 */
export function createLookupEntityPayload(properties: any) {
  const payload = {
    ...Object.entries(properties).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]:
          key.toLowerCase().indexOf("id") !== -1 &&
          key !== "id" &&
          key !== "moneyPaid" &&
          key[key.toLowerCase().indexOf("id") - 1] ===
            key[key.toLowerCase().indexOf("id") - 1].toUpperCase()
            ? Number(value)
            : value,
      }),
      {}
    ),
    id: 0,
  };
  removeReferenceIdProperties(payload);
  convertEmptyStringToNullInObject(payload);
  return payload;
}
