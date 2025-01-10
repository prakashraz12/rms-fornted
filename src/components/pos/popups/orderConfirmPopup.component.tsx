import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { RootState } from "@/types/redux.type";
import { useDispatch, useSelector } from "react-redux";
import { OrderTypeSelector } from "../orderTypeSelection.component";
import { setIsOrderConfirmOpen } from "@/features/pos/posSlice";
import { setRemarks } from "@/features/order/orderSlice";

export function OrderConfirmationPopup() {
  const dispatch = useDispatch();

  const remarks = useSelector((state: RootState) => state.order.remarks);

  const orderItems = useSelector(
    (state: RootState) => state.pos.seletedProducts
  );
  const isOrderConfirmOpen = useSelector(
    (state: RootState) => state.pos.isOrderConfirmOpen
  );

  const totalPrice = orderItems?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Dialog
      aria-label="Order Confirmation"
      open={isOrderConfirmOpen}
      onOpenChange={() => {
        dispatch(setIsOrderConfirmOpen(false));
      }}
    >
      <DialogContent
        aria-label="Order Confirmation"
        className="max-w-2xl h-[90vh] md:h-[80vh] flex flex-col p-2 md:p-4"
      >
        <DialogHeader className="p-2">
          <DialogTitle className="text-lg md:text-xl">
            Confirm Your Order
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow">
          <div className="space-y-3 md:space-y-4">
            <div className="h-[180px] md:h-[200px] w-full rounded-md border p-2 md:p-4 overflow-y-auto">
              {orderItems?.map((item: any, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-2 py-1"
                >
                  <span className="text-sm md:text-base font-medium">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="text-sm md:text-base">
                    Rs.{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center font-bold text-base md:text-lg p-2">
              <span>Total:</span>
              <span>Rs.{totalPrice?.toFixed(2)}</span>
            </div>
            <div className="space-y-2 p-2">
              <Label htmlFor="remarks" className="text-sm md:text-base">
                Remarks
              </Label>
              <Textarea
                id="remarks"
                value={remarks}
                onChange={(e) => dispatch(setRemarks(e.target.value))}
                placeholder="Any special instructions?"
                className="min-h-[80px] md:min-h-[100px]"
              />
            </div>
            <OrderTypeSelector />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
