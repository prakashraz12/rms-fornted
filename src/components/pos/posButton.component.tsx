import { Button } from "@/components/ui/button";
import { ShoppingBag, Sofa, UserRoundPlus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent } from "../ui/dialog";
import { OrderTypeSelector } from "./orderTypeSelection.component";
import { RootState } from "@/types/redux.type";

export default function POSButtons() {
  const dispatch = useDispatch();

  const isOrderTypeSelectorOpen = useSelector(
    (state: RootState) => state.pos.isOderSelctorOpen
  );

  const handleTableSelection = () => {
    dispatch({ type: "pos/setIsOderSelctorOpen", payload: true });
  };

  return (
    <>
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
        <Button
          size="lg"
          className="rounded-none shrink-0"
          onClick={handleTableSelection}
        >
          Order Type <ShoppingBag />
        </Button>
      </div>
    </>
  );
}
