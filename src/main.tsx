/* eslint-disable @typescript-eslint/no-unused-expressions */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./app/globals.css";
import i18n from "./shared/lib/localization/i18n.ts";
i18n;
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
