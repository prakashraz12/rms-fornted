import MainLayout from "@/components/layouts/layout";
import { ProductCreationForm } from "@/components/product/createProduct.component";
import { Role } from "@/enums/role.enums";
import AuthorizationLayout from "@/layouts/authorizationLayout";
import AuthPage from "@/pages/auth.page";
import BillPage from "@/pages/bill.page";
import CoustomerPage from "@/pages/customers.page";
import DashBoard from "@/pages/dashboard.page";
import KitchenBoard from "@/pages/digitalKOT.page";
import FloorManagement from "@/pages/floorManagement.page";
import OrdersPage from "@/pages/orders.page";
import PosPage from "@/pages/POS.page";
import Products from "@/pages/products.page";
import Reports from "@/pages/reports.page";
import RestaurantProfilePage from "@/pages/restaurantProfile.page";
import RolesAndUsers from "@/pages/roles&Users.page";
import Settings from "@/pages/settings.page";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: (
      <AuthorizationLayout requiredRoles={[Role.ADMIN]}>
        <MainLayout />
      </AuthorizationLayout>
    ),
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },
      {
        path: "/floor",
        element: <FloorManagement />,
      },
      {
        path: "/customers",
        element: <CoustomerPage />,
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
      {
        path: "/orders",
        element: <OrdersPage />,
      },
      {
        path: "/bills",
        element: <BillPage />,
      },
    ],
  },
  {
    element: (
      <AuthorizationLayout requiredRoles={[Role.POS_USER, Role.ADMIN]}>
        <PosPage />
      </AuthorizationLayout>
    ),
    path: "/pos",
  },
  {
    path: "/restaurant/portal/login",
    element: <AuthPage />,
  },
  {
    path: "/kitchen-board",
    element: <KitchenBoard />,
  },
  {
    path: "*",
    element: <h1>Not found</h1>,
  },
  {
    path: "/unauthorized",
    element: <h1>Unauthorized</h1>,
  },
]);
