import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Fullscreen, Settings, ShoppingCart } from "lucide-react";
import { OrderStatusDialog } from "./popups/orders.component";
import { CalculatorDialog } from "./popups/calculatorPopup";
import React from "react";
import ProfileDialog from "./POSUserProfile";

interface HeaderProps {
  userName: string;
  userRole: string;
  email: string;
  avatarUrl?: string;
}

export default function PosHeader({
  userName,
  userRole,
  email,
  avatarUrl,
}: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [orderDailogOpen, setOrderDailogOpen] = React.useState(false);
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
        );
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error(
          `Error attempting to exit fullscreen mode: ${err.message} (${err.name})`
        );
      });
    }
  };
  return (
    <div className="flex items-center justify-between px-4 w-full">
      {/* Left side - User Profile */}
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatarUrl} alt={userName} />
          <AvatarFallback>{userName?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold text-sm">
            {userName}, {userRole}
          </span>
          <span className="text-xs text-muted-foreground">{email}</span>
        </div>
      </div>

      {/* Right side - Action Buttons */}
      <div className="flex items-center gap-2">
        <CalculatorDialog />
        <Button
          onClick={toggleFullScreen}
          variant="ghost"
          size="icon"
          className="h-10 w-10  bg-purple-100 hover:bg-purple-200"
        >
          <Fullscreen className="h-5 w-5 text-purple-600" />
        </Button>
        <Button
        onClick={() => setIsProfileOpen(true)}
          variant="ghost"
          size="icon"
          className="h-10 w-10 bg-blue-100 hover:bg-blue-200"
        >
          <Settings className="h-5 w-5 text-blue-600" />
        </Button>
        <Button
          onClick={() => setOrderDailogOpen(true)}
          className="h-10 px-4 bg-green-500 hover:bg-green-600 text-white"
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Orders
        </Button>
        <OrderStatusDialog
          open={orderDailogOpen}
          setOpen={setOrderDailogOpen}
        />
      </div>
      <ProfileDialog isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} initialData={{ name: userName, email, avatarUrl:"" }} />
    </div>
  );
}
