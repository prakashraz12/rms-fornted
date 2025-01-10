import {
  Armchair,
  Barcode,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
  UsersIcon,
  UtensilsCrossed,
} from "lucide-react";
import logo from "./assets/icons/logo.png";
import noImage from "./assets/icons/no-image.png";
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

//menu items
export const MENU_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", link: "/" },
  { icon: Users, label: "Roles & Users", link: "/roles&users" },
  { icon: FileText, label: "Reports", link: "/reports" },
  { icon: Armchair, label: "Floors", link: "/floor" },
  { icon: Users, label: "Bills", link: "/bills" },
  { icon: UtensilsCrossed, label: "Orders", link: "/orders" },
  { icon: UsersIcon, label: "Customers", link: "/customers" },
  { icon: Barcode, label: "Products", link: "/products" },
  { icon: Settings, label: "Settings", link: "/settings" },
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
//sidebar width
export const COLLAPSED_WIDTH = 20;
export const EXPANDED_WIDTH = 64;

//logo image
export const LOGO_IMAGE = logo;
export const COMPANY_NAME = "ForkFlow";

export const NO_IMAGE = noImage;

export const BELL_SOUND = mp3;

//user types
export const USER_TYPES = [
  "ADMIN",
  "POS_USER",
  "INVENTORY_USER",
  "KITCHEN_USER",
];
