import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../../features/auth/pages/LoginPage";
import { CountryIndexPage } from "../../features/countries/pages/IndexPage";
import RequireAuth from "./guards/RequireAuth";
import { RequirePermission } from "./guards/RequirePermission";
import { AppLayout } from "./layouts/AppLayout";
import { PublicLayout } from "./layouts/PublicLayout";
import { RootLayout } from "./layouts/RootLayout";

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
              {
                element: (
                  <RequirePermission resource="countries" action="show" />
                ),
                children: [
                  {
                    path: "/main-data/countries",
                    element: <CountryIndexPage />,
                  },
                ],
              },
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
