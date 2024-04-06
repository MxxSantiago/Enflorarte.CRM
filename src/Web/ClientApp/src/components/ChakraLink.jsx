import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/react";

const ChakraLink = ({ ...props }) => (
  <Text as={Link} _hover={{ color: "currentcolor" }} {...props}>
    {props.children}
  </Text>
);

export default ChakraLink;
