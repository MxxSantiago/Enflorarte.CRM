import { useState, useEffect } from "react";
import { apiClient } from "../helpers/web-api-client.helper.ts";
import { useToast } from "@chakra-ui/react";
import { LANG } from "../helpers/translations.helper.ts";

/**
 * Custom hook for fetching data from an API based on the entity name and ID.
 * @param {string} entityName - The name of the entity to fetch.
 * @param {string} id - The ID of the entity to fetch. If not provided, all entities of the given type will be fetched.
 * @param {boolean} refetchOnMount - Determines whether the data should be refetched when the component mounts. Default is false.
 * @returns {object} - An object containing the following properties:
 * - data: The fetched data.
 * - error: The error object, if any.
 * - isLoading: A boolean indicating whether the data is being fetched.
 * - isSuccess: A boolean indicating whether the data was successfully fetched.
 * - isError: A boolean indicating whether an error occurred during the fetch operation.
 * - isUninitialized: A boolean indicating whether the fetch operation has not yet been initiated.
 * - refetch: A function to manually trigger a refetch of the data.
 */
export const useGetQuery = (entityName, id) => {
  const toast = useToast();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [clearCache, setClearCache] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isUninitialized, setIsUninitialized] = useState(true);
  const [refetchCount, setRefetchCount] = useState(0);

  useEffect(() => {
    /**
     * Fetches the data from the API based on the entity name and ID.
     */
    const fetchData = async () => {
      if (!entityName) return;

      try {
        if (data.length === 0 || clearCache) {
          setIsLoading(true);
          setIsSuccess(false);
          setIsError(false);
        }

        let result;
        if (id) {
          if (clearCache) {
            result = await apiClient.getEntity(entityName, id, true);
          } else {
            result = await apiClient.getEntity(entityName, id);
          }
        } else {
          if (clearCache) {
            result = await apiClient.getAllEntities(entityName, false, true);
          } else {
            result = await apiClient.getAllEntities(entityName);
          }
        }

        setData(result);
        setIsUninitialized(false);
      } catch (err) {
        console.error(err, entityName);
        setIsSuccess(false);
        setIsError(true);
        setError(err);
      } finally {
        if (data.length === 0 || clearCache) {
          setIsLoading(false);
          setClearCache(false);
        }
      }
    };

    fetchData();
  }, [entityName, id, refetchCount]);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Ocurrió un error al intentar obtener la información",
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });
    }
  }, [isError]);

  /**
   * Function to manually trigger a refetch of the data.
   * @param {boolean} clearCache - Determines whether the cache should be cleared before refetching the data.
   */
  const refetch = (clearCache = false) => {
    setClearCache(clearCache);
    setRefetchCount(refetchCount + 1);
  };

  return {
    data,
    error,
    isLoading: isLoading,
    isSuccess: isSuccess,
    isError: isError,
    isUninitialized: isUninitialized,
    refetch,
  };
};

/**
 * Custom hook for making a POST request to create an entity.
 *
 * @param {string} entityName - The name of the entity.
 * @param {object} entity - The entity object to be created.
 * @returns {object} - An object containing the following properties:
 * - id: The identificator of the created entity.
 * - error: The error object, if any.
 * - isLoading: A boolean indicating whether the create operation is in progress.
 * - isSuccess: A boolean indicating whether the create operation was successful.
 * - isError: A boolean indicating whether an error occurred during the create operation.
 * - postEntity: A function to initiate the create operation.
 */
const usePostQuery = (entityName, entity) => {
  const toast = useToast();
  const [id, setId] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const postEntity = async () => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      setIsError(false);

      const result = await apiClient.createEntity(entityName, entity);
      setId(result);
      setIsSuccess(true);
    } catch (err) {
      setError(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: `${LANG(entityName)} creado correctamente`,
        status: "success",
        isClosable: true,
        position: "bottom-right",
      });
    } else if (isError) {
      toast({
        title: error.message,
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });
    }
  }, [isSuccess, isError]);

  return {
    id,
    error,
    isLoading,
    isSuccess,
    isError,
    postEntity,
  };
};

/**
 * Custom hook for making a PUT request to update an entity.
 *
 * @param {string} entityName - The name of the entity.
 * @param {string} id - The ID of the entity to update.
 * @param {object} entity - The updated entity object.
 * @returns {object} - An object containing the following properties:
 *  - data: The result of the update operation.
 * - error: The error object, if any.
 * - isLoading: A boolean indicating whether the update operation is in progress.
 * - isSuccess: A boolean indicating whether the update operation was successful.
 * - isError: A boolean indicating whether an error occurred during the update operation.
 * - putEntity: A function to initiate the update operation.
 */
const usePutQuery = (entityName, entity) => {
  const toast = useToast();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const putEntity = async () => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      setIsError(false);

      const result = await apiClient.updateEntity(entityName, {
        ...entity,
        id: entity.id,
      });
      setData(result);
      setIsSuccess(true);
    } catch (err) {
      setError(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: `${LANG(entityName)} actualizado correctamente`,
        status: "success",
        isClosable: true,
        position: "bottom-right",
      });
    } else if (isError) {
      toast({
        title: "Ocurrió un error al intentar actualizar la entidad",
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });
    }
  }, [isSuccess, isError]);

  return {
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    putEntity,
  };
};

/**
 * Custom hook for deleting an entity.
 *
 * @param {string} entityName - The name of the entity to delete.
 * @param {string} id - The ID of the entity to delete.
 * @returns {Object} - An object containing the following properties:
 *   - data: The result of the delete operation.
 *   - error: The error object, if any.
 *   - isLoading: A boolean indicating whether the delete operation is in progress.
 *   - isSuccess: A boolean indicating whether the delete operation was successful.
 *   - isError: A boolean indicating whether an error occurred during the delete operation.
 *   - deleteEntity: A function to initiate the delete operation.
 */
const useDeleteQuery = (entityName, id) => {
  const toast = useToast();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const deleteEntity = async () => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      setIsError(false);

      const result = await apiClient.deleteEntity(entityName, id);
      setData(result);
      setIsSuccess(true);
    } catch (err) {
      setError(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: `${LANG(entityName)} eliminado correctamente`,
        status: "success",
        isClosable: true,
        position: "bottom-right",
      });
    } else if (isError) {
      toast({
        title: `
          La ${LANG(entityName)}
          no se pudo eliminar ya que hay recurso(s) asociado(s).
        `,
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });
    }
  }, [isSuccess, isError]);

  return {
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    deleteEntity,
  };
};

export { usePostQuery, usePutQuery, useDeleteQuery };
