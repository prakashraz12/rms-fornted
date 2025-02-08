import {
  Archive,
  Armchair,
  Barcode,
  Calculator,
  FileText,
  LayoutDashboard,
  Newspaper,
  ShoppingCart,
  Settings,
  Users,
  UsersIcon,
  UtensilsCrossed,
} from "lucide-react";
import logo from "./assets/icons/logo.png";
import noImage from "./assets/icons/no-image.png";
import plate from "./assets/icons/plate.png";
import mp3 from "./assets/sound/bell.mp3";
import { Banknote, CreditCard, Landmark, FileCheck } from "lucide-react";

//main color
export const MAIN_COLOR = "#50C67C";
export const MAIN_COLOR_DARK = "#31A497";

//secondary color
export const SECONDARY_COLOR = "#F7B11D";
export const SECONDARY_COLOR_DARK = "#E9880F";

//text color
export const TEXT_COLOR = "#193648";
export const TEXT_COLOR_DARK = "#000000";

// Menu item types
interface SubMenuItem {
  label: string;
  link: string;
}

interface BaseMenuItem {
  icon: any; // Using 'any' for Lucide icons, you can make this more specific if needed
  label: string;
  link: string;
}

interface MenuItemWithSubItems extends BaseMenuItem {
  subItems: SubMenuItem[];
}

type MenuItem = BaseMenuItem | MenuItemWithSubItems;

interface MenuCategory {
  category: string;
  items: MenuItem[];
}

//menu items
export const MENU_ITEMS: MenuCategory[] = [
  {
    category: "Main",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", link: "/" },
      { icon: Calculator, label: "POS", link: "/pos" },
      { icon: UtensilsCrossed, label: "Orders", link: "/orders" },
    ],
  },
  {
    category: "Management",
    items: [
      {
        icon: Barcode,
        label: "Products",
        link: "/products",
        subItems: [
          { label: "All Products", link: "/products" },
          { label: "Categories", link: "/products/categories" },
          { label: "Add Product", link: "/product/create" },
        ],
      },
      {
        icon: Archive,
        label: "Inventory",
        link: "/inventory",
      },
      {
        icon: ShoppingCart,
        label: "Purchases",
        link: "/purchases",
      },
    ],
  },
  {
    category: "Sales",
    items: [
      { icon: Newspaper, label: "Bills", link: "/bills" },
      { icon: FileText, label: "Reports", link: "/reports" },
      { icon: UsersIcon, label: "Customers", link: "/customers" },
    ],
  },
  {
    category: "Administration",
    items: [
      { icon: Armchair, label: "Floors", link: "/floor" },
      { icon: Users, label: "Roles & Users", link: "/roles&users" },
      { icon: Settings, label: "Settings", link: "/settings" },
    ],
  },
];

export const PAYMENT_METHODS: { label: string; value: string; icon: any }[] = [
  {
    label: "Cash",
    value: "CASH",
    icon: Banknote,
  },
  {
    label: "Online",
    value: "ONLINE",
    icon: CreditCard,
  },
  {
    label: "Credit",
    value: "CREDIT",
    icon: Landmark,
  },

  {
    label: "Cheque",
    value: "CHEQUE",
    icon: FileCheck,
  },
];

export const BILL_STATUS = [
  { label: "Paid", value: "PAID" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "Due", value: "DUE" },
  { label: "Partial", value: "PARTIALLY_PAID" },
  { label: "Unpaid", value: "UNPAID" },
];

//sidebar width
export const COLLAPSED_WIDTH = 20;
export const EXPANDED_WIDTH = 64;

//logo image
export const LOGO_IMAGE = logo;
export const COMPANY_NAME = "ForkFlow";

export const NO_IMAGE = noImage;

export const BELL_SOUND = mp3;
export const PLATE_IMAGE = plate;
//user types
export const USER_TYPES = [
  "ADMIN",
  "POS_USER",
  "INVENTORY_USER",
  "KITCHEN_USER",
];
