import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { FC, DragEvent, useContext } from "react";
import { UIContext } from "../../context/ui";

import { Entry } from "../../interfaces";

interface Props {
  entry: Entry;
}
export const EntryCard: FC<Props> = ({ entry }) => {
  const router = useRouter();
  const { setisDragging } = useContext(UIContext);
  const onDragStart = (event: DragEvent | any) => {
    event.dataTransfer.setData("text", entry._id);
    setisDragging(true);
  };
  const onDragEnd = () => {
    setisDragging(false);
  };
  const onClick = () => {
    router.push(`/entries/${entry._id}`);
  };
  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
        >
          <Typography variant="body2">hace 30 minutos</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
