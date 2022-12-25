import { FC, useReducer } from "react";

import { v4 as uuidv4 } from "uuid";
import { EntriesContext, EntriesReducer } from "./";
import { Entry } from "../../interfaces";
export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description:
        "Pendiente: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi, libero.",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description:
        "En Progreso: Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      _id: uuidv4(),
      description:
        "Finalizado: Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      status: "finished",
      createdAt: Date.now() - 500000,
    },
    {
      _id: uuidv4(),
      description:
        "En progreso: Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      status: "in-progress",
      createdAt: Date.now() - 400000,
    },
  ],
};
interface Props {
  children: JSX.Element;
}
export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(EntriesReducer, Entries_INITIAL_STATE);
  const AddEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: "pending",
    };
    dispatch({
      type: "[Entry - Add-Entry]",
      payload: newEntry,
    });
  };
  const updateEntry = (entry: Entry) => {
    dispatch({ type: "[Entry - Entry-Updated]", payload: entry });
  };
  return (
    <EntriesContext.Provider
      value={{
        ...state,
        AddEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
