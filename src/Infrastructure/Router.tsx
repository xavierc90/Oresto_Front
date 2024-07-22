import { createBrowserRouter } from "react-router-dom";
import { Login } from "../Application/Pages/Login";
import { Home } from "../Application/Pages/Home"

export const router = createBrowserRouter([
{
    path: "/",
    element: <Home />,
},
{
    path: "/login",
    element: <Login />,
}
]);