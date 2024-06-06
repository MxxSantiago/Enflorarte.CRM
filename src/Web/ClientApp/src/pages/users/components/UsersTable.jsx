import { useState, useEffect, useCallback } from "react";
import { Box, Card, Flex, Skeleton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import ModifyUser from "./ModifyUser";
import DeleteUser from "./DeleteUser";
import EntitiesTableFooter from "../../../pages/administration/components/entitiesTable/EntitiesTableFooter";

const itemsPerPage = 30;

const paginate = (items, currentPage, itemsPerPage) => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
};

const UsersTable = ({ users, isLoading, isError, refetch, roles }) => {
    const [paginatedUsers, setPaginatedUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setPaginatedUsers(paginate(users, currentPage, itemsPerPage));
    }, [currentPage, users]);

    const totalPages = Math.ceil(users.length / itemsPerPage);

    const changePage = useCallback(
        (newPage) => {
            if (newPage > 0 && newPage <= totalPages) {
                setCurrentPage(newPage);
            }
        },
        [totalPages]
    );

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
                                {paginatedUsers.map((user) => (
                                    <Tr key={user.id}>
                                        <Td>{user.userName}</Td>
                                        <Td>{user.email}</Td>
                                        <Td>{user.roles.join(", ")}</Td>
                                        <Td>
                                            <Flex justifyContent="flex-end" gap="10px">
                                                <ModifyUser user={user} refetch={refetch} roles={roles} />
                                                <DeleteUser user={user} refetch={refetch} />
                                            </Flex>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Skeleton>
            </Box>
            <EntitiesTableFooter
                totalPages={totalPages}
                totalItems={users.length}
                currentPage={currentPage}
                changePage={changePage}
            />
        </Card>
    );
};

export default UsersTable;