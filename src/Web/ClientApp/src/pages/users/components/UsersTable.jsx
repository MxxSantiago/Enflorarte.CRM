import {Box, Card, Flex, Skeleton, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import ModifyUser from "./ModifyUser";
import DeleteUser from "./DeleteUser";

const UsersTable = ({users, isLoading, isError, refetch, roles}) => {
    return (
        <Card
            variant="outline"
            display="grid"
            gridTemplateRows="calc(100% - 60px) 60px"
            overflow="hidden"
            width="100%"
        >
            <Box overflowY="auto">
                <Skeleton isLoaded={!isLoading} height="100%" fadeDuration={1}>
                    <TableContainer overflowX="unset" overflowY="unset">
                        <Table variant="striped">
                            <Thead>
                                <Tr>
                                    <Th>Nombre de usuario</Th>
                                    <Th>Email</Th>
                                    <Th>Roles</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {users.map((user) => (
                                    <Tr key={user.id}>
                                        <Td>{user.userName}</Td>
                                        <Td>{user.email}</Td>
                                        <Td>{user.roles.join(", ")}</Td>
                                        <Td>
                                            <Flex justifyContent="flex-end" gap="10px">
                                                <ModifyUser user={user} refetch={refetch} roles={roles}/>
                                                <DeleteUser user={user} refetch={refetch}/>
                                            </Flex>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Skeleton>
            </Box>
        </Card>
    );
};

export default UsersTable;