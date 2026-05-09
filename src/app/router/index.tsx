import { EmployeeCreatePage } from "@/features/employees/pages/CreatePage";
import { EmployeeEditPage } from "@/features/employees/pages/EditPage";
import { EmployeeIndexPage } from "@/features/employees/pages/IndexPage";
import { EmployeeShowPage } from "@/features/employees/pages/ShowPage";
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
              {
                element: (
                  <RequirePermission resource="employees" action="show" />
                ),
                children: [
                  {
                    path: "/main-data/employees",
                    element: <EmployeeIndexPage />,
                  },
                  {
                    path: "/main-data/employees/create",
                    element: <EmployeeCreatePage />,
                  },
                  {
                    path: "/main-data/employees/:id",
                    element: <EmployeeShowPage />,
                  },
                  {
                    path: "/main-data/employees/:id/edit",
                    element: <EmployeeEditPage />,
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
