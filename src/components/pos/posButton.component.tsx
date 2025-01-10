import { Button } from "@/components/ui/button";
import { PlusIcon, ShoppingBag, Sofa } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/types/redux.type";
import { useState } from "react";
import { POS_SELECTION_TYPE } from "@/enums/posSelectionType.enum";
import { CustomerCardPopup } from "./popups/addCoustomerPopup.component";

export default function POSButtons() {
  const dispatch = useDispatch();

  const posSelectionType = useSelector(
    (state: RootState) => state.pos.posSelectionType
  );

  const [isCustomerOpen, setIsCustomerOpen] = useState<boolean>(false);

  const handleTableSelection = () => {
    dispatch({ type: "pos/setIsOderSelctorOpen", payload: true });
  };

  return (
    <>
      <div className="border-b border-t flex justify-start h-10 overflow-x-auto overflow-y-hidden scrollbar-none sm:justify-end">
        <CustomerCardPopup
          isOpen={isCustomerOpen}
          setIsOpen={setIsCustomerOpen}
        />
        {posSelectionType === POS_SELECTION_TYPE.EXISTING && (
          <Button
            variant="secondary"
            size="lg"
            className="rounded-none shrink-0 border-r-2 border-r-gray-200"
            onClick={() => setIsCustomerOpen(true)}
          >
            Add Customer
            <PlusIcon />
          </Button>
        )}
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
