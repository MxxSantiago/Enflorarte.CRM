import { useState, useEffect } from "react";
import { apiClient } from "../helpers/web-api-client.helper.ts";
import { useToast } from "@chakra-ui/react";

interface CommandResponse {
  data: any;
  setData: any;
  error: ApiError | undefined;
  setError: any;
  isLoading: boolean;
  setIsLoading: any;
  isSuccess: boolean;
  setIsSuccess: any;
  isError: boolean;
  setIsError: any;
}

interface ApiError {
  title: string;
  status: number;
  errors: {
    [key: string]: string[];
  };
}

/**
 * Custom hook for making an API request.
 *
 * @param {any} initialData - The initial data to be set in the hook.
 * @returns {CommandResponse} - An object containing the following properties:
 * - data: The result of the create operation.
 * - setData: A function to set the data.
 * - error: The error object, if any.
 * - setError: A function to set the error.
 * - isLoading: A boolean indicating whether the create operation is in progress.
 * - setIsLoading: A function to set the loading state.
 * - isSuccess: A boolean indicating whether the create operation was successful.
 * - setIsSuccess: A function to set the success state.
 * - isError: A boolean indicating whether an error occurred during the create operation.
 * - setIsError: A function to set the error state.
 */
const useApiRequest = (initialData: any): CommandResponse => {
  const toast = useToast();
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState<ApiError>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: `Operación realizada correctamente`,
        status: "success",
        isClosable: true,
        position: "bottom-right",
      });
    } else if (isError) {
      if (errors!.status === 401) {
        toast({
          title: "Acción no autorizada para el usuario actual",
          status: "error",
          isClosable: true,
          position: "bottom-right",
        });
      } else {
        if (errors?.errors == null) {
          toast({
            title: errors!.title,
            status: "error",
            isClosable: true,
            position: "bottom-right",
          });
          return;
        }

        Object.entries(errors!.errors).forEach((error) => {
          toast({
            title: error[1],
            status: "error",
            isClosable: true,
            position: "bottom-right",
          });
        });
      }
    }
  }, [isSuccess, isError]);

  return {
    data,
    setData,
    error: errors,
    setError: setErrors,
    isLoading,
    setIsLoading,
    isSuccess,
    setIsSuccess,
    isError,
    setIsError,
  };
};

/**
 * Custom hook for executing a command.
 * @param {function} command - The command to execute.
 * @returns {object} - An object containing the following properties:
 * - data: The result of the command.
 * - error: The error object, if any.
 * - isLoading: A boolean indicating whether the command is in progress.
 * - isSuccess: A boolean indicating whether the command was successful.
 * - isError: A boolean indicating whether an error occurred during the command execution.
 * - execute: A function to execute the command.
 */
const useCommandQuery = (command) => {
  const {
    data,
    setData,
    error,
    setError,
    isLoading,
    setIsLoading,
    isSuccess,
    setIsSuccess,
    isError,
    setIsError,
  } = useApiRequest(null);

  const executeCommand = async (...args: any[]) => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);
    try {
      const result = await command(...args);
      setData(result);
      setIsSuccess(true);
    } catch (err) {
      setError(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    execute: executeCommand,
  };
};

const usePostQuery = (entityName: string, entity: any) => {
  const { execute, ...rest } = useCommandQuery(apiClient.createEntity);
  return { execute: () => execute(entityName, entity), ...rest };
};

const usePutQuery = (entityName, entity) => {
  const { execute, ...rest } = useCommandQuery(apiClient.updateEntity);

  return {
    execute: () =>
      execute(entityName, {
        ...entity,
        id: entity.id,
      }),
    ...rest,
  };
};

const useDeleteQuery = (entityName, id) => {
  const { execute, ...rest } = useCommandQuery(apiClient.deleteEntity);
  return { execute: () => execute(entityName, id), ...rest };
};

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
const useGetQuery = (entityName, id) => {
  const {
    data,
    setData,
    error,
    setError,
    isLoading,
    setIsLoading,
    isSuccess,
    setIsSuccess,
    isError,
    setIsError,
  } = useApiRequest([]);

  const [clearCache, setClearCache] = useState(false);
  const [isUninitialized, setIsUninitialized] = useState(true);
  const [refetchCount, setRefetchCount] = useState(0);

  useEffect(() => {
    setIsLoading(true);
  }, [entityName, id]);

  useEffect(() => {
    const fetchData = async () => {
      if (!entityName) {
        setIsSuccess(false);
        setIsError(false);
        setIsLoading(false);
        return;
      }

      try {
        if (data.length === 0 || clearCache) {
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
          setClearCache(false);
        }

        setIsLoading(false);
      }
    };

    fetchData();
  }, [entityName, id, refetchCount]);

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

export { useGetQuery, usePostQuery, usePutQuery, useDeleteQuery };
