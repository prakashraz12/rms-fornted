import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { RootState } from "@/types/redux.type";
import { OrderTypeSelector } from "../orderTypeSelection.component";

const OrderTypeSelectionPopUp = () => {
  const dispatch = useDispatch();
  const isOrderTypeSelectorOpen = useSelector(
    (state: RootState) => state.pos.isOderSelctorOpen
  );
  return (
    <Dialog
      open={isOrderTypeSelectorOpen}
      onOpenChange={() => {
        dispatch({ type: "pos/setIsOderSelctorOpen", payload: false });
      }}
    >
      <DialogContent className="w-[95%] md:w-[80%] lg:w-[60%] xl:w-[60%] max-w-[700px] p-2 md:p-4 shadow-none border-none overflow-y-auto max-h-[90vh]">
        <OrderTypeSelector />
        <DialogFooter className="mt-4 p-2 md:p-4 flex items-center">
          <Button
            onClick={() => {
              dispatch({ type: "pos/setIsOderSelctorOpen", payload: false });
            }}
            size={"lg"}
            className="w-full h-10 md:h-12 text-sm md:text-base"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderTypeSelectionPopUp;
