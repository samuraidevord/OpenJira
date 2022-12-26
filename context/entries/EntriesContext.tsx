import { createContext } from "react";
import { Entry } from "../../interfaces";

interface ContextProps {
  entries: Entry[];
  AddEntry: (description: string) => void;
  updateEntry: (entry: Entry, showSnacbar?: boolean) => void;
  deleteEntries: (_id: string) => void;
}
export const EntriesContext = createContext({} as ContextProps);
