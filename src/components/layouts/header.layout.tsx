import { Bell, Search, Settings, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeSwitcherComponent from "../theme/ThemeSwitcher.component";
import { useSelector } from "react-redux";
import LogoutConfirmationDialog from "../logout-dialog/logout-dialog";
import { useEffect, useState } from "react";
import { RootState } from "@/types/redux.type";
import { useLogoutRestaurantMutation } from "@/services/api/auth.api";
import { Role } from "@/enums/role.enums";

interface HeaderLayoutProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function HeaderLayout({
  collapsed,
  setCollapsed,
}: HeaderLayoutProps) {
  const role = useSelector((state: RootState) => state.auth.role);
  const [
    logoutRestaurant,
    {
      isLoading: isLogoutRestaurantLoading,
      isSuccess: isLogoutRestaurantSuccess,
    },
  ] = useLogoutRestaurantMutation();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    if (role === Role.ADMIN) {
      await logoutRestaurant({}).unwrap();
    }
  };

  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    if (isLogoutRestaurantSuccess) {
      setOpen(false);
      window.location.href = "/restaurant/portal/login";
    }
  }, [isLogoutRestaurantSuccess]);

  return (
    <div>
      <nav className="border-b bg-background dark:bg-black w-full sticky top-0 z-50 max-h-20">
        <div className="flex h-16 items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="mr-4"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="ml-auto flex items-center space-x-4">
            <form className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-[200px] pl-8"
                />
              </div>
            </form>
            <ThemeSwitcherComponent />
            <Button size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-4" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpen(true)}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
      <LogoutConfirmationDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleLogout}
        isLoading={isLogoutRestaurantLoading}
      />
    </div>
  );
}
