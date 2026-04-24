import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { PublicLayout } from "./layouts/PublicLayout";
import { RootLayout } from "./layouts/RootLayout";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <PublicLayout />,
        children: [{ path: "/login", element: <div>Login page</div> }],
      },
      {
        element: <AppLayout />,
        children: [{ path: "/", element: <div>App Home</div> }],
      },
    ],
  },
]);
