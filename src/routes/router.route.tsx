import MainLayout from "@/components/layouts/layout";
import { ProductCreationForm } from "@/components/product/createProduct.component";
import PurchaseCreatePage from "@/components/purchuses-history/createPurchuses.component";
import PurchusesHistory from "@/components/purchuses-history/purchusesHistory";
import MyReports from "@/components/report/reports";
import { Role } from "@/enums/role.enums";
import AuthorizationLayout from "@/layouts/authorizationLayout";
import AuthPage from "@/pages/auth.page";
import BillPage from "@/pages/bill.page";
import CategoryTable from "@/pages/category.page";
import CoustomerPage from "@/pages/customers.page";
import DashBoard from "@/pages/dashboard.page";
import KitchenBoard from "@/pages/digitalKOT.page";
import FloorManagement from "@/pages/floorManagement.page";
import InventoryPage from "@/pages/inventory.page";
import OrdersPage from "@/pages/orders.page";
import PosPage from "@/pages/POS.page";
import ProductEditPage from "@/pages/productEditPage";
import Products from "@/pages/products.page";
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
        element: <MyReports />,
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
        path: "/product/edit/:id",
        element: <ProductEditPage />,
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
      {
        path: "/inventory",
        element: <InventoryPage />,
      },
      {
        path: "/purchases",
        element: <PurchusesHistory />,
      },
      {
        path: "/purchases/create",
        element: <PurchaseCreatePage />,
      },
      {
        path: "/products/categories",
        element: <CategoryTable />,
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
