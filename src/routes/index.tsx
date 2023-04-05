import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FC } from "react";
import axios from "axios";

import Home from "@/pages";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Profile from "@/pages/Profile";

axios.defaults.baseURL =
  "https://virtserver.swaggerhub.com/devanada/hells-kitchen/1.1.0";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "profile/:username",
    element: <Profile />,
  },
]);

export const Router: FC = () => {
  return <RouterProvider router={router} />;
};

export default Router;
