import { createBrowserRouter } from "react-router-dom";
import { Login } from "../../Application/Pages/Login";
import { Home } from "../../Application/Pages/Home"
import { Register } from "../../Application/Pages/Register";
import { LostPassword } from "../../Application/Pages/LostPassword";
import { Dashboard } from "../../Application/Pages/Dashboard";
import { Conditions } from "../../Application/Pages/Conditions";

export const router = createBrowserRouter([
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
    element: <Register />
},
{
    path: "/lostpassword",
    element: <LostPassword />
},
{
    path: "/conditions",
    element: <Conditions />
},
{
    path: "/dashboard",
    element: <Dashboard />
}
]);