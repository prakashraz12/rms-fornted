import MainLayout from "@/components/layouts/layout";
import { ThemeProvider } from "@/components/layouts/theme.layout";
import AuthPage from "@/pages/auth.page";
import DashBoard from "@/pages/dashboard.page";
import FloorManagement from "@/pages/floorManagement.page";
import PosPage from "@/pages/POS.page";
import Products from "@/pages/products.page";
import Reports from "@/pages/reports.page";
import RolesAndUsers from "@/pages/roles&Users.page";
import Settings from "@/pages/settings.page";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: (
      <ThemeProvider>
        <MainLayout />
      </ThemeProvider>
    ),
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path:"/floor",
        element:<FloorManagement/>
      },
      {
        path:"/roles&users",
        element:<RolesAndUsers/>
      },
      {
        path:"/reports",
        element:<Reports/>
      },
      {
        path:"/products",
        element:<Products/>
      },
      {
        path:"/settings",
        element:<Settings/>
      }
    ],
  },
  {
    element: (
      <ThemeProvider>
        <PosPage />
      </ThemeProvider>
    ),
    path: "/pos",
  },
]);
