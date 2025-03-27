import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../store";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material";

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

export const NewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const news = useSelector((state: RootState) => state.news.news);
  const currentNew = news.find((it) => it.id === id);

  if (!currentNew) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h6" color="error">
          Новость не найдена
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Card
        sx={{
          bgcolor: "#132C43",
          color: "white",
          p: 3,
          display: "flex",
          flexDirection: "column",
          width: 800,
          height: 500,
          borderRadius: 5,
          flexWrap: "wrap",
        }}
      >
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            textWrap: "wrap",
          }}
        >
          <Typography variant="h3" sx={{ mb: 1 }}>
            Новость
          </Typography>
          <Divider sx={{ backgroundColor: "gray", mb: 2 }} />

          <Typography
            variant="h5"
            sx={{
              mb: 2,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              overflow: "hidden",
            }}
          >
            {currentNew.title}
          </Typography>
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            {currentNew.description}
          </Typography>

          <Divider sx={{ backgroundColor: "gray", my: 2 }} />
          <Box
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              variant="contained"
              onClick={() => navigate(-1)}
              sx={{ backgroundColor: "#1E88E5", color: "white" }}
            >
              Назад
            </Button>
            <Typography variant="body2" color="gray">
              {formatDate(currentNew.created_at)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
