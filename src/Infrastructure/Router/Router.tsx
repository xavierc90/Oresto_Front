import { ReactNode } from 'react';
import { createBrowserRouter, Navigate } from "react-router-dom";
import { HomePage } from "../../Application/Pages/HomePage";
import { LoginPage } from "../../Application/Pages/LoginPage";
import { RegisterPage } from "../../Application/Pages/RegisterPage";
import { LostPasswordPage } from "../../Application/Pages/LostPasswordPage";
import { DashboardPage } from "../../Application/Pages/DashboardPage";
import { BookingsPage } from "../../Application/Pages/BookingsPage"; 
import { ClientsPage } from "../../Application/Pages/ClientsPage"; 
import { useAuth } from "../../Module/Auth/auth.hook";
import { TableLayoutPage } from "../../Application/Pages/TableLayoutPage";
import { AnalyticsPage } from "../../Application/Pages/AnalyticsPage";
import { SettingsPage } from "../../Application/Pages/SettingsPage";

type ProtectedRouteProps = {
  element: ReactNode;
};

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login", // Connexion Manager
    element: <LoginPage />,
  },
  {
    path: "/register", // Inscription Manager
    element: <RegisterPage />,
  },
  {
    path: "/lostpassword",
    element: <LostPasswordPage />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute element={<DashboardPage />} />,
    children: [
      {
        path: "bookings",
        element: <ProtectedRoute element={<BookingsPage />} />,
      },
      {
        path: "layouts",
        element: <ProtectedRoute element={<TableLayoutPage />} />,
      },
      {
        path: "clients",
        element: <ProtectedRoute element={<ClientsPage />} />,
      },
      {
        path: "analytics",
        element: <ProtectedRoute element={<AnalyticsPage />} />,
      },
      {
        path: "settings",
        element: <ProtectedRoute element={<SettingsPage />} />,
      }    
    ],
  },
]);