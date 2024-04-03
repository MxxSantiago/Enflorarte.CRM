import { Link as ReactRouterLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";

const ChakraLink = ({ to, ...props }) => (
  <Link as={ReactRouterLink} {...props}>
    {props.children}
  </Link>
);

export default ChakraLink;
