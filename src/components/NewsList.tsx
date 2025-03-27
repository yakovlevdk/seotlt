import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { NewsState } from "../slices/NewsSlice";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const isYesterday =
    date.getDate() === now.getDate() - 1 &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const time = date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isToday) return `Сегодня, в ${time}`;
  if (isYesterday) return `Вчера, в ${time}`;

  return (
    date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
    }) + `, в ${time}`
  );
};
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
          <Link to={`/${newItem.id}`}>
            <ListItemText
              primary={newItem.title}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="gray">
                    Создано: {formatDate(newItem.created_at)}
                  </Typography>
                </>
              }
            />
          </Link>
        </ListItem>
      ))}
    </List>
  );
};
