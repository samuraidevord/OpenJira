// React
import React, { FC, useContext } from "react";
import NextLink from "next/link";
// Material UI
import { AppBar, IconButton, Toolbar, Typography, Link } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// Paquetes
import { UIContext } from "../../context/ui";

interface Props {}
export const Navbar: FC<Props> = () => {
  const { openSideMenu, closeSideMenu } = useContext(UIContext);
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start" onClick={openSideMenu}>
          <MenuOutlinedIcon />
        </IconButton>

        <NextLink href="/" style={{ color: "white", textDecoration: "none" }}>
          <Typography variant="h6">OpenJira</Typography>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};
