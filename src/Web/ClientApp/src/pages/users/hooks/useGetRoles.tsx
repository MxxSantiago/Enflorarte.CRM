import {useEffect, useState} from "react";

export const useGetRoles = () => {
    const [roles, setRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await fetch('/api/Auth/roles');
                if (!response.ok) {
                    throw new Error('Error al cargar los roles');
                }
                const data = await response.json();
                setRoles(data);
                setIsLoading(false);
            } catch (error) {
                setIsError(true);
                setIsLoading(false);
            }
        };

        fetchRoles();
    }, []);

    return {roles, isLoading, isError};
};