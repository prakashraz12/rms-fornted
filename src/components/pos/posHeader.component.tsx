import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Fullscreen, Settings, ShoppingCart } from "lucide-react";
import { OrderStatusDialog } from "./orders.component";
import { CalculatorDialog } from "./calculator";

interface HeaderProps {
  userName: string;
  userRole: string;
  email: string;
  avatarUrl?: string;
}

export default function PosHeader({
  userName = "Prakash Raz Shreshtha",
  userRole = "POS User",
  email = "rzprakash16@gmail.com",
  avatarUrl,
}: HeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white border-b">
      {/* Left side - User Profile */}
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatarUrl} alt={userName} />
          <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold text-sm">{userName}</span>
          <span className="text-xs text-muted-foreground">{email}</span>
        </div>
      </div>

      {/* Right side - Action Buttons */}
      <div className="flex items-center gap-2">
        <CalculatorDialog />
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10  bg-purple-100 hover:bg-purple-200"
        >
          <Fullscreen className="h-5 w-5 text-purple-600" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 bg-blue-100 hover:bg-blue-200"
        >
          <Settings className="h-5 w-5 text-blue-600" />
        </Button>

        <OrderStatusDialog />
      </div>
    </div>
  );
}
