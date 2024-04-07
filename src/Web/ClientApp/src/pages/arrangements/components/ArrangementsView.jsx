import {
  SimpleGrid,
  Box,
  Card,
  Text,
  Badge,
  Stack,
  Image,
} from "@chakra-ui/react";

const ArrangementsView = () => {
  const arrangement = {
    IsTemplate: true,
    TypeId: 1,
    image: "https://via.placeholder.com/500",
    Type: "Type 1",
    Wrappings: [{ name: "Wrapping 1" }, { name: "Wrapping 2" }],
    Flowers: [{ name: "Flower 1" }, { name: "Flower 2" }],
    Extras: ["Extra 1", "Extra 2"],
    Message: "This is a message",
  };

  const items = Array(50).fill(arrangement);

  return (
    <Box py={5} px={8} width="100%">
      <Text fontSize="3xl">Arrangements</Text>
      <SimpleGrid minChildWidth="250px" spacing={10} width="100%">
        {items.map((item, index) => (
          <Card
            key={index}
            variant="outline"
            height="400px"
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            p={5}
            borderRadius="lg"
            boxShadow="lg"
          >
            <Text fontSize="2xl" mb={4}>
              Arrangement {index}
            </Text>
            <Stack spacing={2}>
              <Image src={item.image} alt="Arrangement" height={100} />
              <Badge colorScheme="green">
                Is Template: {item.IsTemplate ? "Yes" : "No"}
              </Badge>
              <Badge colorScheme="blue">Type ID: {item.TypeId}</Badge>
              <Badge colorScheme="purple">Type: {item.Type}</Badge>
              <Badge colorScheme="pink">
                Wrappings: {item.Wrappings?.map((w) => w.name).join(", ")}
              </Badge>
              <Badge colorScheme="yellow">
                Flowers: {item.Flowers?.map((f) => f.name).join(", ")}
              </Badge>
              <Badge colorScheme="red">Extras: {item.Extras?.join(", ")}</Badge>
            </Stack>
            <Text mt={4}>Message: {item.Message}</Text>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ArrangementsView;
