/* eslint-disable @typescript-eslint/no-unused-expressions */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./app/globals.css";
import { QueryProvider } from "./app/providers/QueryProvider.tsx";
import { router } from "./app/router/index.tsx";
import i18n from "./shared/lib/localization/i18n.ts";
i18n;
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  </StrictMode>,
);
