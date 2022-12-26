import { FC, useReducer, useEffect } from "react";

import { useSnackbar } from "notistack";

import { EntriesContext, EntriesReducer } from "./";

import { Entry } from "../../interfaces";
import { entriesApi } from "../../apis";
import { useRouter } from "next/router";
export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};
interface Props {
  children: JSX.Element;
}
export const EntriesProvider: FC<Props> = ({ children }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(EntriesReducer, Entries_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();
  const AddEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>("/entries", {
      description,
    });
    dispatch({
      type: "[Entry - Add-Entry]",
      payload: data,
    });
  };
  const updateEntry = async (
    { _id, description, status }: Entry,
    showSnacbar = false
  ) => {
    try {
      const reponse = await fetch(
        process.env.NEXT_PUBLIC_HOST + "api/entries/" + _id,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status, description }),
        }
      );
      const data = await reponse.json();
      dispatch({ type: "[Entry - Entry-Updated]", payload: data });
      if (showSnacbar) {
        enqueueSnackbar("Entada actualizada", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      console.log({ error });
    }
  };
  const refreshEntries = async () => {
    try {
      const reponse = await fetch(process.env.NEXT_PUBLIC_HOST + "api/entries");
      const data = await reponse.json();
      dispatch({ type: "[Entry - Refresh-data]", payload: data });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteEntries = async (_id: string) => {
    const reponse = await fetch(
      process.env.NEXT_PUBLIC_HOST + "api/entries/" + _id,
      {
        method: "DELETE",
      }
    );
    const data = await reponse.json();
    console.log(data);
    dispatch({ type: "[Entry - Delete-Entry]", payload: data });

    enqueueSnackbar("Entada eliminada correctamente", {
      variant: "success",
      autoHideDuration: 1500,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };
  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        AddEntry,
        updateEntry,
        deleteEntries,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
