import { createContext } from "react";
import { Entry } from "../../interfaces";

interface ContextProps {
  entries: Entry[];
  AddEntry: (description: string) => void;
  updateEntry: (entry: Entry) => void;
}
export const EntriesContext = createContext({} as ContextProps);
