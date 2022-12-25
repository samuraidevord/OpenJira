// React
import { Children, FC } from "react";
// NextJS
import Head from "next/head";
// Materual UI
import { Box } from "@mui/material";
import { Navbar, SideBar } from "../ui";
// Interfaces

interface Props {
  title?: string;
  children: JSX.Element;
}
export const Layout: FC<Props> = ({
  title = "OpenJira | Samurai.dev.ord",
  children,
}) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />
      <SideBar />

      <Box sx={{ padding: "10px 20px" }}>{children}</Box>
    </Box>
  );
};
