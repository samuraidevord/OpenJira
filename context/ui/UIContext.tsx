// Creación del contexto para el "User Interface".
// React
import { createContext } from "react";

interface ContextProps {
  sideMenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
}
export const UIContext = createContext({} as ContextProps);
