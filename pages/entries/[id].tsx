// React
import React, { useState, ChangeEvent, useMemo, useContext } from "react";
// Next JS
import type { NextPage, GetServerSideProps } from "next";
// Material UI
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  TextField,
  CardActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

// Paquetes
import { Layout } from "../../components/layouts";
import { Entry, EntryStatus } from "../../interfaces";
import { DeleteOutline } from "@mui/icons-material";
import { isValidObjectId } from "mongoose";
import { EntriesContext } from "../../context/entries";

interface Props {
  entry: Entry;
}
const EntryPage: NextPage<Props> = ({ entry }) => {
  const { updateEntry, deleteEntries } = useContext(EntriesContext);
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);
  const onTextFielChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };
  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched]
  );
  const onSave = () => {
    console.log({ status, inputValue });
    if (inputValue.trim().length === 0) return;
    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    };
    console.log(updatedEntry);
    updateEntry(updatedEntry, true);
  };
  const onDelete = () => {
    deleteEntries(entry._id);
  };
  const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];
  return (
    <Layout title={inputValue.substring(0, 20) + "..."}>
      <>
        <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={8} md={6}>
            <Card>
              <CardHeader
                title={`Entrada: ${entry._id}`}
                subheader={`Creada hace: ${entry.createdAt} minutos`}
              />
              <CardContent>
                <TextField
                  sx={{ marginTop: 2, marginBottom: 1 }}
                  fullWidth
                  autoFocus
                  multiline
                  onChange={onTextFielChanged}
                  onBlur={() => setTouched(true)}
                  helperText={isNotValid && "Ingrese un valoe"}
                  error={isNotValid}
                  value={inputValue}
                />
                <FormControl sx={{ marginTop: 2 }}>
                  <FormLabel>Estado:</FormLabel>
                  <RadioGroup row value={status} onChange={onStatusChanged}>
                    {validStatus.map((option) => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </CardContent>
              <CardActions>
                <Button
                  startIcon={<SaveOutlinedIcon />}
                  variant="contained"
                  fullWidth
                  onClick={onSave}
                  disabled={inputValue.length <= 0}
                >
                  Guardar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        <IconButton
          sx={{
            position: "fixed",
            bottom: 30,
            right: 30,
            backgroundColor: "red",
          }}
          onClick={onDelete}
        >
          <DeleteOutline />
        </IconButton>
      </>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  if (!isValidObjectId(id)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const response = await fetch(
    process.env.NEXT_PUBLIC_HOST + "api/entries/" + id
  );
  const entry = await response.json();
  return {
    props: { entry },
  };
};
export default EntryPage;
