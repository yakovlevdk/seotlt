import { Button, FormControl, Input, InputLabel } from "@mui/material";
import { addNew, editNew, NewsState } from "../slices/NewsSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
  };
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <FormControl sx={{ width: "300px" }}>
        <InputLabel htmlFor="title" sx={{ color: "white" }}>
          Название новости
        </InputLabel>
        <Input
          id="title"
          aria-describedby="title-helper-text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            color: "white",
            "& .MuiInput-underline:before": { borderBottomColor: "white" },
            "& .MuiInput-underline:hover:before": {
              borderBottomColor: "white",
            },
            "& .MuiInput-underline:after": { borderBottomColor: "white" },
          }}
        />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="description" sx={{ color: "white" }}>
          Описание новости
        </InputLabel>
        <Input
          id="description"
          aria-describedby="description-helper-text"
          sx={{ color: "white" }}
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
    </form>
  );
};
