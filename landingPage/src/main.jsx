import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
// import styles from sass
import "./sass/main.scss";
import "./index.css";
// Import i18n configuration
import "./i18n";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
