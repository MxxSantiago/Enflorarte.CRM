﻿import {useCallback, useState} from "react";

export const useUpdateUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [refetchCount, setRefetchCount] = useState(0);

    const execute = useCallback(async (user) => {
        setIsLoading(true);
        setIsError(false);
        setIsSuccess(false);

        try {
            const response = await fetch('/api/Auth/updateUser', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el usuario');
            }
            setIsSuccess(true);
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }, [refetchCount]);

    const refetch = () => {
        setRefetchCount(refetchCount + 1);
    };

    return {isLoading, isError, isSuccess, execute, refetch};
}