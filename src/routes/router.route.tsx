import MainLayout from "@/components/layouts/layout";
import { ProductCreationForm } from "@/components/product/createProduct.component";
import AuthPage from "@/pages/auth.page";
import DashBoard from "@/pages/dashboard.page";
import FloorManagement from "@/pages/floorManagement.page";
import PosPage from "@/pages/POS.page";
import Products from "@/pages/products.page";
import Reports from "@/pages/reports.page";
import RestaurantProfilePage from "@/pages/restaurantProfile.page";
import RolesAndUsers from "@/pages/roles&Users.page";
import Settings from "@/pages/settings.page";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
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
        path: "/floor",
        element: <FloorManagement />,
      },
      {
        path: "/roles&users",
        element: <RolesAndUsers />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product/create",
        element: <ProductCreationForm />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/profile",
        element: <RestaurantProfilePage />,
      },
    ],
  },
  {
    element: <PosPage />,
    path: "/pos",
  },
  {
    path: "/restaurant/portal/login",
    element: <AuthPage />,
  },
]);
