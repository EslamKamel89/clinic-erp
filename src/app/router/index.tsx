import { createBrowserRouter } from "react-router-dom";
import RequireAuth from "./guards/RequireAuth";
import { AppLayout } from "./layouts/AppLayout";
import { PublicLayout } from "./layouts/PublicLayout";
import { RootLayout } from "./layouts/RootLayout";
import { LoginPage } from "./pages/LoginPage";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <PublicLayout />,
        children: [{ path: "/login", element: <LoginPage /> }],
      },
      {
        element: <RequireAuth />,
        children: [
          {
            element: <AppLayout />,
            children: [
              { path: "/", element: <div>App Home</div> },
              { path: "/main-data/countries", element: <div>Countries</div> },
              { path: "/main-data/cities", element: <div>Cities</div> },
              { path: "/main-data/states", element: <div>States</div> },
              { path: "/main-data/languages", element: <div>Languages</div> },
            ],
          },
        ],
      },
    ],
  },
]);
