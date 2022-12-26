import { Entry } from "../../interfaces";
import { EntriesState } from "./";

type EntriesActionType =
  | { type: "[Entry - Add-Entry]"; payload: Entry }
  | { type: "[Entry - Delete-Entry]"; payload: Entry }
  | { type: "[Entry - Entry-Updated]"; payload: Entry }
  | { type: "[Entry - Refresh-data]"; payload: Entry[] };

export const EntriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case "[Entry - Add-Entry]":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case "[Entry - Entry-Updated]":
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }
          return entry;
        }),
      };
    case "[Entry - Refresh-data]":
      return {
        ...state,
        entries: [...action.payload],
      };
    case "[Entry - Delete-Entry]":
      return {
        ...state,
        entries: state.entries.filter((entry) => {
          console.log();
          if (entry._id != action.payload._id) {
            console.log(entry._id);
            return entry;
          }
        }),
      };
    default:
      return state;
  }
};
