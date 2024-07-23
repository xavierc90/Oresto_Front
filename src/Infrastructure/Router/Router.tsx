import { createBrowserRouter } from "react-router-dom";
import { Login } from "../../Application/Pages/Login";
import { Home } from "../../Application/Pages/Home"
import { Register } from "../../Application/Pages/Register";

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
}
]);