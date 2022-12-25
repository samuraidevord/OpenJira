import { FC, useContext, useMemo, DragEventHandler } from "react";
import { Paper, List } from "@mui/material";
import { EntryStatus } from "../../interfaces";
import { EntryCard } from "./EntryCard";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
import styles from "./EntryList.module.css";
interface Props {
  status: EntryStatus;
}
export const EntryList: FC<Props> = ({ status }) => {
  // TODO: Aquí haremos drop
  // Hacemos uso del usMemo para que solo se pidan las entries cuando
  // dichas enries cambien.
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, setisDragging } = useContext(UIContext);
  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );
  const allowDrop = (event: DragEventHandler<HTMLDivElement> | any) => {
    event.preventDefault();
  };
  const onDropEntry = (event: DragEventHandler<HTMLDivElement> | any) => {
    const id = event.dataTransfer.getData("text");
    const entry = entries.find((e) => e._id === id)!;
    entry.status = status;
    updateEntry(entry);
    setisDragging(false);
  };
  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ""}
    >
      <Paper
        sx={{
          height: "calc(100vh - 280px)",
          backgroundColor: "transparent",

          padding: 1,
        }}
      >
        {/* TODO: Cambiará dependiendo si estamos haciendo drag o no */}
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: "all .3s" }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
