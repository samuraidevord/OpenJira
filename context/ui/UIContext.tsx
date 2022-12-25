// Creación del contexto para el "User Interface".
// React
import { createContext } from "react";

interface ContextProps {
  sideMenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  isAddingEntry: boolean;
  setisAddingEntry: (isAdding: boolean) => void;
  isDragging: boolean;
  setisDragging: (isDragging: boolean) => void;
}
export const UIContext = createContext({} as ContextProps);
