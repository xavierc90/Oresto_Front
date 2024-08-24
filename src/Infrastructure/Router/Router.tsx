import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { HomePage } from "../../Application/Pages/HomePage";
import { LoginPage } from "../../Application/Pages/LoginPage";
import { RegisterPage } from "../../Application/Pages/RegisterPage";
import { LostPasswordPage } from "../../Application/Pages/LostPasswordPage";
import { DashboardPage } from "../../Application/Pages/DashboardPage";
import { BookingsPage } from "../../Application/Pages/BookingsPage"; 
import { ClientsPage } from "../../Application/Pages/ClientsPage"; 
import { TablePlanPage } from "../../Application/Pages/TablePlanPage";
import { AnalyticsPage } from "../../Application/Pages/AnalyticsPage";
import { SettingsPage } from "../../Application/Pages/SettingsPage";
import { RegisterCompany } from "../../Application/Pages/RegisterCompany";
import { useAuth } from '../../Module/Auth/useAuth';

const ProtectedRoute = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/login" />;
};

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
    element: <RegisterPage />,
  },
  {
    path: "/lostpassword",
    element: <LostPasswordPage />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />, // Protéger la route dashboard
    children: [
      {
        path: "",
        element: <DashboardPage />, // DashboardPage avec DashboardNav
        children: [
          {
            path: "bookings",
            element: <BookingsPage />, // Les enfants sont déjà protégés par la route parent
          },
          {
            path: "table_plan",
            element: <TablePlanPage />,
          },
          {
            path: "clients",
            element: <ClientsPage />,
          },
          {
            path: "analytics",
            element: <AnalyticsPage />,
          },
          {
            path: "settings",
            element: <SettingsPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/register_company",
    element: <ProtectedRoute />, // Protéger la création d'entreprise
    children: [
      {
        path: "",
        element: <RegisterCompany />,
      },
    ],
  },
]);
