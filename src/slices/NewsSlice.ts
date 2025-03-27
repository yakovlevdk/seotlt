import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface NewsState {
  id: string;
  title: string;
  description: string;
  created_at: string;
}

interface NewsSliceState {
  news: NewsState[];
}

const loadFromLocalStorage = (): NewsState[] => {
  try {
    return JSON.parse(localStorage.getItem("news") || "[]");
  } catch {
    return [];
  }
};

const initialState: NewsSliceState = {
  news: loadFromLocalStorage(),
};

const saveToLocalStorage = (news: NewsState[]) => {
  localStorage.setItem("news", JSON.stringify(news));
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    addNew: (state, action: PayloadAction<NewsState>) => {
      state.news.push(action.payload);
      saveToLocalStorage(state.news);
    },
    deleteNew: (state, action: PayloadAction<string>) => {
      state.news = state.news.filter((item) => item.id !== action.payload);
      saveToLocalStorage(state.news);
    },
    editNew: (state, action: PayloadAction<NewsState>) => {
      const index = state.news.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.news[index] = action.payload;
        saveToLocalStorage(state.news);
      }
    },
  },
});

export const { addNew, deleteNew, editNew } = newsSlice.actions;

export default newsSlice.reducer;
