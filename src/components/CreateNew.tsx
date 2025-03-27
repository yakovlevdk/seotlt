import {
  Alert,
  Button,
  FormControl,
  Input,
  InputLabel,
  OutlinedInput,
  Snackbar,
} from "@mui/material";
import { addNew, editNew, NewsState } from "../slices/NewsSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SnackbarContent from "@mui/material/SnackbarContent";
export const CreateForm = ({
  editNews,
  setEditNews,
}: {
  editNews: NewsState | null;
  setEditNews: (item: NewsState | null) => void;
}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEdit, setIsEdit] = useState(!!editNews);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  useEffect(() => {
    if (editNews) {
      setTitle(editNews.title);
      setDescription(editNews.description);
      setIsEdit(true);
    }
  }, [editNews]);

  useEffect(() => {
    if (editNews) {
      setTitle(editNews.title);
      setDescription(editNews.description);
      setIsEdit(true);
    } else {
      setTitle("");
      setDescription("");
      setIsEdit(false);
    }
  }, [editNews]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newNewsItem = {
      id: editNews?.id ?? uuidv4(),
      title,
      description,
      created_at: editNews ? editNews.created_at : new Date().toISOString(),
    };

    if (isEdit) {
      dispatch(editNew(newNewsItem));
      setEditNews(null);
      setIsEdit(false);
    } else {
      dispatch(addNew(newNewsItem));
      setEditNews(null);
    }

    setTitle("");
    setDescription("");
    setIsOpenAlert(true);
  };
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <FormControl sx={{ width: "300px" }}>
        <InputLabel htmlFor="title" sx={{ color: "white" }}>
          Название новости
        </InputLabel>
        <OutlinedInput
          id="title"
          label="Название новости"
          aria-describedby="title-helper-text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            color: "white",
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#132B43" },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1876D2",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1876D2",
            },
          }}
        />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="description" sx={{ color: "white" }}>
          Описание новости
        </InputLabel>
        <OutlinedInput
          id="description"
          label="Описание новости"
          aria-describedby="description-helper-text"
          sx={{
            color: "white",
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#132B43" },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1876D2",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1876D2",
            },
          }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>
      {!isEdit && (
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "", color: "white", mt: 2 }}
        >
          Добавить
        </Button>
      )}
      {isEdit && (
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "", color: "white", mt: 2 }}
        >
          Редактировать
        </Button>
      )}
      <Snackbar
        open={isOpenAlert}
        autoHideDuration={2000}
        onClose={() => setIsOpenAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setIsOpenAlert(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Успешно!
        </Alert>
      </Snackbar>
    </form>
  );
};
