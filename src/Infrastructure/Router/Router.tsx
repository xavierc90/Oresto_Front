import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../../Application/Pages/LoginPage";
import { HomePage } from "../../Application/Pages/HomePage"
import { RegisterPage } from "../../Application/Pages/RegisterPage";
import { LoginFormUser } from "../../Application/Components/Widget/Form/LoginFormUser";
import { RegisterFormUser } from "../../Application/Components/Widget/Form/RegisterFormUser";
import { LostPasswordPage } from "../../Application/Pages/LostPasswordPage";
import { DashboardPage } from "../../Application/Pages/DashboardPage";
import { ConditionsPage } from "../../Application/Pages/ConditionsPage";

export const router = createBrowserRouter([
{
    path: "/",
    element: <HomePage />,
},
{
    path: "/login",
    element: <LoginPage />,
},
{
    path: "/register",
    element: <RegisterPage />
},
{
    path: "/lostpassword",
    element: <LostPasswordPage />
},
{
    path: "/conditions",
    element: <ConditionsPage />
},
{
    path: "/dashboard",
    element: <DashboardPage />
},
{
    path: "/loginuser",
    element: <LoginFormUser />,
    children: [
      {
        path: "registeruser",
        element: <RegisterFormUser />,
      },
    ],
  },
]);