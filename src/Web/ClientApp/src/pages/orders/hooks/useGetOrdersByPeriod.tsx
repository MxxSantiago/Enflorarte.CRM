import { SetStateAction, useEffect, useState } from "react";
import { apiClient } from "../../../core/helpers/web-api-client.helper.ts";
import { useToast } from "@chakra-ui/react";
import { Order } from "../../../web-api-client";
import { toLocalISOString } from "../../../core/helpers/dates.helper.ts";

type Period = "Day" | "Week" | "Month";

interface Result {
  data: Order[];
  error: any;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isUninitialized: boolean;
  refetch: (clearCache?: boolean) => void;
  cacheKey?: string;
}

/**
 * Custom hook for fetching data from an API based on the entity name and ID.
 * @param {Period} period - The period for which to fetch the orders.
 * @param {string} fromDate - The date from which to fetch the orders.
 * @returns {Result} An object containing the following properties:
 * - data: The fetched data.
 * - error: The error object, if any.
 * - isLoading: A boolean indicating whether the data is being fetched.
 * - isSuccess: A boolean indicating whether the data was successfully fetched.
 * - isError: A boolean indicating whether an error occurred during the fetch operation.
 * - isUninitialized: A boolean indicating whether the fetch operation has not yet been initiated.
 * - refetch: A function to manually trigger a refetch of the data.
 */
const useGetOrdersByPeriod = (
  period: Period,
  fromDate: Date = new Date(new Date().setDate(new Date().getDate() - 1))
): Result => {
  const entityName = "order";
  const restMethod = `Get${period}Orders`;

  const toast = useToast();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [clearCache, setClearCache] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isUninitialized, setIsUninitialized] = useState(true);
  const [refetchCount, setRefetchCount] = useState(0);
  const [cacheKey, setCacheKey] = useState(
    `orders_${period}/${toLocalISOString(fromDate)}`
  );

  useEffect(() => {
    setCacheKey(`orders_${period}/${toLocalISOString(fromDate)}`);
  }, [fromDate]);

  useEffect(() => {
    setIsLoading(true);
  }, [entityName]);

  useEffect(() => {
    setClearCache(true);
  }, [fromDate, period]);

  useEffect(() => {
    /**
     * Fetches the data from the API based on the entity name and ID.
     */
    const fetchData = async () => {
      setIsLoading(true);

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

        let result: SetStateAction<never[]>;

        if (clearCache) {
          result = await apiClient.executeCustomMethod(
            entityName,
            restMethod,
            true,
            fromDate,
            cacheKey
          );
        } else {
          result = await apiClient.executeCustomMethod(
            entityName,
            restMethod,
            false,
            fromDate,
            cacheKey
          );
        }

        setData(result);
        setIsUninitialized(false);
      } catch (err) {
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
  }, [entityName, refetchCount, period, fromDate, cacheKey]);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Ocurrió un error al intentar obtener las ordenes",
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });

      throw error;
    }
  }, [isError]);

  /**
   * Function to manually trigger a refetch of the data.
   * @param {boolean} clearCache - Determines whether the cache should be cleared before refetching the data.
   */
  const refetch = (clearCache: boolean = false) => {
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
    cacheKey,
  };
};

export default useGetOrdersByPeriod;
