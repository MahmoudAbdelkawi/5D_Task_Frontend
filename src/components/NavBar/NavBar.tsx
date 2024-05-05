import { Box, ButtonBase, CardMedia, Container, Modal } from "@mui/material";
import { useState } from "react";

const NavBar = () => {
  return (
    <Box
      sx={{
        padding: "1rem",
        height: "80px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        background:
          "linear-gradient(10.15deg, rgb(255, 44, 0) -6.51%, rgb(144, 0, 195) 120.19%)",
        position: "sticky",
        top: "0",
        zIndex: "100",
      }}
    ></Box>
  );
};

export default NavBar;
