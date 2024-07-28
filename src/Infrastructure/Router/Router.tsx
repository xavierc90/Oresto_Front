import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../../Application/Pages/HomePage"
import { LoginPage } from "../../Application/Pages/LoginPage";
import { RegisterPage } from "../../Application/Pages/RegisterPage";
import { LostPasswordPage } from "../../Application/Pages/LostPasswordPage";
import { DashboardPage } from "../../Application/Pages/DashboardPage";

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
    path: "/dashboard",
    element: <DashboardPage />
}
]);