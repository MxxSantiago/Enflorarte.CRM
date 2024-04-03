import React from "react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function BotonEditar({ texto, to }) {
  return (
    <div>
      <Link to={to}>
        <Button
          bg="#FC8181"
          _hover={{ bg: "#f36868" }}
          color="white"
          size={{ base: "sm" }}
        >
          {texto}
        </Button>
      </Link>
    </div>
  );
}

export default BotonEditar;
