import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { HomePage } from "../../Application/Pages/HomePage";
import { LoginPage } from "../../Application/Pages/LoginPage";
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
    path: "/dashboard",
    element: <ProtectedRoute />,  // ProtectedRoute encapsule toutes les routes sous /dashboard
    children: [
      {
        path: "", 
        element: <DashboardPage />, // Assurez-vous que DashboardPage est bien rendu ici
        children: [
          {
            path: "bookings",
            element: <BookingsPage />,  // BookingsPage est protégé
          },
          {
            path: "table_plan",
            element: <TablePlanPage />,  // TablePlanPage est protégé
          },
          {
            path: "clients",
            element: <ClientsPage />,  // ClientsPage est protégé
          },
          {
            path: "analytics",
            element: <AnalyticsPage />,  // AnalyticsPage est protégé
          },
          {
            path: "settings",
            element: <SettingsPage />,  // SettingsPage est protégé
          },
        ],
      },
    ],
  },
  {
    path: "/register_company",
    element: <ProtectedRoute />, // Protège la création d'entreprise
    children: [
      {
        path: "", 
        element: <RegisterCompany />,
      },
    ],
  },
]);
