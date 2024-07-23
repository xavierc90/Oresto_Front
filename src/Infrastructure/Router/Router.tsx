import { createBrowserRouter } from "react-router-dom";
import { Login } from "../../Application/Pages/Login";
import { Home } from "../../Application/Pages/Home"
import { Dashboard } from "../../Application/Pages/Dashboard";

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
    path: "/dashboard",
    element: <Dashboard />
}
]);