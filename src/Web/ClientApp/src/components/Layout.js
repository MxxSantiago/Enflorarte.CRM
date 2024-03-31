import React from "react";
import { Container } from "reactstrap";
import { NavMenu } from "./NavMenu";

export const Layout = ({ children }) => (
  <div>
    <NavMenu />
    <Container tag="main">{children}</Container>
  </div>
);
