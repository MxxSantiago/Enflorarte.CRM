import React from 'react';
import useGetUsers from '../hooks/useGetUsers.tsx';
import { Grid, Box, Text } from "@chakra-ui/react";
import UsersTable from "./UsersTable";
import {useGetRoles} from "../hooks/useGetRoles.tsx";
const UsersView = () => {
    const {
        users,
        isLoading,
        isError,
        refetch
    } = useGetUsers();

    const {roles} = useGetRoles();


    return (
        <Grid
            height="100%"
            width="100%"
            gridTemplateRows="60px calc(100% - 60px)"
            px={{ base: 4, md: 6 }}
            py={4}
        >
            <Box display="flex" width="100%" alignItems="center" height="100%">
                <Text
                    fontSize={{
                        base: "lg",
                        md: "2xl",
                    }}
                    fontWeight="bold"
                    marginBottom={2}
                >
                    Usuarios
                </Text>
            </Box>
            <UsersTable
                users={users}
                roles={roles}
                isLoading={isLoading}
                isError={isError}
                refetch={refetch}
            />
        </Grid>
    );
};

export default UsersView;