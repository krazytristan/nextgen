import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

/* ================= STYLES ================= */
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

/* ================= APP INIT ================= */
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
