import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { NewsState } from "../slices/NewsSlice";

export const NewsList = ({
  setEditNews,
  news,
  handleDelete,
}: {
  setEditNews: (item: NewsState) => void;
  news: NewsState[];
  handleDelete: (id: string) => void;
}) => {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "#132C43",
        borderRadius: "15px",
      }}
    >
      {news?.map((newItem) => (
        <ListItem
          key={newItem.id}
          secondaryAction={
            <>
              <IconButton
                aria-label="comment"
                onClick={() => setEditNews(newItem)}
              >
                <EditIcon color="primary" />
              </IconButton>
              <IconButton
                aria-label="comment"
                onClick={() => handleDelete(newItem.id)}
                key={newItem.id}
              >
                <DeleteIcon color="error" key={newItem.id} />
              </IconButton>
            </>
          }
        >
          <ListItemText primary={newItem.title} />
        </ListItem>
      ))}
    </List>
  );
};
