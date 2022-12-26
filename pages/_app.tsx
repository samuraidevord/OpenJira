// Next Js
import type { AppProps } from "next/app";
// Material UI
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, ThemeProvider } from "@mui/material";

// NotisStack
import { SnackbarProvider } from "notistack";
// Estilos
import "../styles/globals.css";
// Paquetes
import { UIProvider } from "../context/ui";
import { EntriesProvider } from "../context/entries";
import { lightTheme, darkTheme } from "../themes";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  );
}
