import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// React-ийг #root элемент дотор эхлүүлнэ
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
