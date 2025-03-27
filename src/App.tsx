import { Typography } from "@mui/material";
import { NewsList } from "./components/NewsList";
import { CreateForm } from "./components/CreateNew";
import { useEffect, useState } from "react";
import { deleteNew, NewsState } from "./slices/NewsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  const [editNews, setEditNews] = useState<NewsState | null>(null);
  const news = useSelector((state: RootState) => state.news.news);
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.setItem("news", JSON.stringify(news));
  }, [news]);
  const handleDelete = (id: string) => {
    dispatch(deleteNew(id));
  };
  useEffect(() => {
    const storedNews = JSON.parse(localStorage.getItem("news") || "[]");
    if (storedNews.length !== news.length) {
      dispatch({ type: "news/sync", payload: storedNews });
    }
  }, [news]);
  return (
    <>
      <div className="flex items-center justify-center flex-col gap-8">
        <Typography variant="h5" className="text-[20px]">
          Тестовое задание для SEOTLT
        </Typography>
        <NewsList
          setEditNews={setEditNews}
          news={news}
          handleDelete={handleDelete}
        />
        <CreateForm editNews={editNews} setEditNews={setEditNews} />
      </div>
    </>
  );
}

export default App;
