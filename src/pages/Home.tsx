import { Box, ButtonBase, Container, Divider, Typography } from "@mui/material";
import React from "react";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";
import { Add } from "@mui/icons-material";
import Users from "./Users";

const Home = () => {
  return (
    <Container>
      <BreadCrumbs />
      <Divider />



      <Users />
    </Container>
  );
};

export default Home;
