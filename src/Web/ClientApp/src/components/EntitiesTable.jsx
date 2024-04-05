import React, {useEffect, useState} from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableContainer,
    Card,
    Button,
    Box,
} from "@chakra-ui/react";
import {getAllEntities, removeReferenceIdProperties,} from "../helpers/web-api-client.helper.ts";
import TableItem from "./TableItem.jsx";

function EntitiesTable({entityName, refreshView, lastUpdated, entity}) {
    const [items, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        populateItems();
    }, [lastUpdated, currentPage]);

    const populateItems = async () => {
        const data = await getAllEntities(entityName);
        const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
        setData(paginatedData);
        setTotalItems(data.length);
    };

    const nextPage = () => {
        if(!isLastPage()){
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const isLastPage = () => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        return currentPage >= totalPages;
    };

    return (<Card
        borderRadius="lg"
        overflowX="auto"
        maxW={{base: "100%", md: "700px"}}
    >
        <TableContainer>
            <Table variant="striped" colorScheme="pink">
                <Thead>
                    <Tr>
                        {Object.keys(removeReferenceIdProperties(entity))
                            .filter((key) => key.indexOf("id") === -1)
                            .map((key) => (<Th key={key}>{key}</Th>))}
                    </Tr>
                </Thead>
                <Tbody>
                    {items.map((item) => (<TableItem
                        lastUpdated={lastUpdated}
                        key={item.id}
                        item={item}
                        entityName={entityName}
                        refreshView={refreshView}
                    />))}
                </Tbody>
            </Table>
        </TableContainer>
        <Box display="flex" justifyContent="center" mt={4} mb={3}>
            <Button onClick={prevPage} mr={2}>
                Anterior
            </Button>
            <Button onClick={nextPage} mr={2}>
                Siguiente
            </Button>
        </Box>
    </Card>
);
}

export default EntitiesTable;
