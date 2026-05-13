import { DoctorCreatePage } from "@/features/doctors/pages/CreatePage";
import { DoctorEditPage } from "@/features/doctors/pages/EditPage";
import { DoctorIndexPage } from "@/features/doctors/pages/IndexPage";
import { DoctorShowPage } from "@/features/doctors/pages/ShowPage";
import { EmployeeCreatePage } from "@/features/employees/pages/CreatePage";
import { EmployeeEditPage } from "@/features/employees/pages/EditPage";
import { EmployeeIndexPage } from "@/features/employees/pages/IndexPage";
import { EmployeeShowPage } from "@/features/employees/pages/ShowPage";
import { appRoutes } from "@/features/navigation/routes";
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
        children: [{ path: appRoutes.auth.login, element: <LoginPage /> }],
      },
      {
        element: <RequireAuth />,
        children: [
          {
            element: <AppLayout />,
            children: [
              { path: appRoutes.home, element: <div>App Home</div> },
              {
                element: (
                  <RequirePermission resource="countries" action="show" />
                ),
                children: [
                  {
                    path: appRoutes.country.index,
                    element: <CountryIndexPage />,
                  },
                ],
              },
              // employee
              {
                element: (
                  <RequirePermission resource="employees" action="show" />
                ),
                children: [
                  {
                    path: appRoutes.employee.index,
                    element: <EmployeeIndexPage />,
                  },

                  {
                    path: appRoutes.employee.showTemplate,
                    element: <EmployeeShowPage />,
                  },
                ],
              },
              {
                element: (
                  <RequirePermission resource="employees" action="create" />
                ),
                children: [
                  {
                    path: appRoutes.employee.create,
                    element: <EmployeeCreatePage />,
                  },
                ],
              },
              {
                element: (
                  <RequirePermission resource="employees" action="update" />
                ),
                children: [
                  {
                    path: appRoutes.employee.editTemplate,
                    element: <EmployeeEditPage />,
                  },
                ],
              },
              // doctors
              {
                element: <RequirePermission resource="doctors" action="show" />,
                children: [
                  {
                    path: appRoutes.doctor.index,
                    element: <DoctorIndexPage />,
                  },

                  {
                    path: appRoutes.doctor.showTemplate,
                    element: <DoctorShowPage />,
                  },
                ],
              },
              {
                element: (
                  <RequirePermission resource="doctors" action="create" />
                ),
                children: [
                  {
                    path: appRoutes.doctor.create,
                    element: <DoctorCreatePage />,
                  },
                ],
              },
              {
                element: (
                  <RequirePermission resource="doctors" action="update" />
                ),
                children: [
                  {
                    path: appRoutes.doctor.editTemplate,
                    element: <DoctorEditPage />,
                  },
                ],
              },

              { path: appRoutes.city.index, element: <div>Cities</div> },
              { path: appRoutes.state.index, element: <div>States</div> },
              { path: appRoutes.language.index, element: <div>Languages</div> },
            ],
          },
        ],
      },
    ],
  },
]);
