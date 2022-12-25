import { ChangeEvent, FC, useState, useContext } from "react";
import { Box, Button, TextField } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { v4 as uuidv4 } from "uuid";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
import { Entry } from "../../interfaces";
export const NewEntry: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);
  const { AddEntry } = useContext(EntriesContext);

  const { setisAddingEntry, isAddingEntry } = useContext(UIContext);
  const onTextFielChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const onSave = () => {
    if (inputValue.length === 0) return;
    AddEntry(inputValue);
    setisAddingEntry(false);
    setTouched(false);
    setInputValue("");
  };
  return (
    <Box sx={{ marginBottom: 1, padding: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="Nueva Entrada"
            autoFocus
            multiline
            label="Nueva entrada"
            error={inputValue.length <= 0 && touched}
            value={inputValue}
            onChange={onTextFielChanged}
            onBlur={() => setTouched(true)}
          />

          <Box
            display="flex"
            justifyContent="space-between"
            sx={{ marginBottom: 1 }}
          >
            <Button variant="text" onClick={() => setisAddingEntry(false)}>
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddCircleOutlineOutlinedIcon />}
          fullWidth
          variant="outlined"
          onClick={() => setisAddingEntry(true)}
        >
          Agregar Tarea
        </Button>
      )}
    </Box>
  );
};
