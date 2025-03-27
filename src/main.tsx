import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { BrowserRouter, Routes, Route } from "react-router";
import { NewPage } from "./pages/NewPage.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path=":id" element={<NewPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
