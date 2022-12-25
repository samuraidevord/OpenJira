import { FC, useReducer } from "react";

import { UIContext, uiReducer } from "./";

export interface UIState {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}
interface Props {
  children: JSX.Element;
}
const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

export const UIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);
  const openSideMenu = () => {
    dispatch({ type: "UI - Open Sidebar" });
  };
  const closeSideMenu = () => {
    dispatch({ type: "UI - Close Sidebar" });
  };
  const setisAddingEntry = (isAdding: boolean) => {
    dispatch({ type: "UI - Set isAddingEntry", payload: isAdding });
  };
  const setisDragging = (isDragging: boolean) => {
    dispatch({ type: "UI - Set isDragging", payload: isDragging });
  };
  return (
    <UIContext.Provider
      value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        setisAddingEntry,
        setisDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
