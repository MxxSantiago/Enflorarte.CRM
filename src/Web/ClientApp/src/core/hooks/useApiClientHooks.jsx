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
 * - localMutations: An object containing the following functions for local mutations:
 *  - add: A function to add a new entity to the data.
 *  - delete: A function to delete an entity from the data.
 *  - update: A function to update an existing entity in the data.
 */
export const useGetQuery = (entityName, id, refetchOnMount = false) => {
  const toast = useToast();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [refetchCount, setRefetchCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isUninitialized, setIsUninitialized] = useState(true);

  useEffect(() => {
    /**
     * Fetches the data from the API based on the entity name and ID.
     */
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsSuccess(false);
        setIsError(false);
        setIsUninitialized(true);

        let result;
        if (id) {
          result = await apiClient.getEntity(entityName, id);
        } else {
          result = await apiClient.getAllEntities(entityName);
        }

        setData(result);

        if (result) {
          setIsSuccess(true);
          setIsError(false);
          setIsUninitialized(false);
        } else {
          setIsSuccess(false);
          setIsError(true);
          setIsUninitialized(false);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [entityName, id, refetchOnMount, refetchCount]);

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
   */
  const refetch = () => {
    setRefetchCount(refetchCount + 1);
  };

  /**
   * Function to add a new entity to the data.
   * @param {object} entity - The entity object to add.
   */
  const _add = (entity) => {
    setData([...data, entity]);
  };

  /**
   * Function to delete an entity from the data based on its ID.
   * @param {string} id - The ID of the entity to delete.
   */
  const _delete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  /**
   * Function to update an existing entity in the data.
   * @param {object} updatedEntity - The updated entity object.
   */
  const _update = (updatedEntity) => {
    setData(
      data.map((item) => (item.id === updatedEntity.id ? updatedEntity : item))
    );
  };

  return {
    data,
    error,
    isLoading: isLoading,
    isSuccess: isSuccess,
    isError: isError,
    isUninitialized: isUninitialized,
    refetch,
    localMutations: {
      add: _add,
      delete: _delete,
      update: _update,
    },
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
