import {useEffect, useState} from "react";

export const useGetUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [refetchCount, setRefetchCount] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            setIsError(false);
            try {
                const response = await fetch('/api/Auth/users');
                if (!response.ok) {
                    throw new Error('Error al cargar los usuarios');
                }
                const data = await response.json();
                setUsers(data);
                setIsLoading(false);
            } catch (error) {
                setIsError(true);
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, [refetchCount]);

    const refetch = () => {
        setRefetchCount(refetchCount + 1);
    };

    return {users, isLoading, isError, refetch};
};
export default useGetUsers;