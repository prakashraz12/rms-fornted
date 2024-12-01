import { Button } from "@/components/ui/button";
import { ShoppingBag, Sofa, UserRoundPlus } from "lucide-react";

export default function POSButtons() {
  return (
    <div className="border-b flex justify-start h-10 overflow-x-auto overflow-y-hidden scrollbar-none sm:justify-end">
      <Button
        size="lg"
        className="rounded-none border-r-2 border-r-gray-200 shrink-0"
        variant="destructive"
      >
        Add Customer <UserRoundPlus />
      </Button>
      <Button
        size="lg"
        className="rounded-none border-r-2 border-r-gray-200 bg-green-500 hover:bg-green-600 shrink-0"
      >
        Table <Sofa />
      </Button>
      <Button size="lg" className="rounded-none shrink-0">
        Order Type <ShoppingBag />
      </Button>
    </div>
  );
}
