import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { RootState } from "@/types/redux.type";
import { useSelector } from "react-redux";
import { OrderTypeSelector } from "./orderTypeSelection.component";
import { useCreateOrderMutation } from "@/services/api/order.api";

export function OrderConfirmationPopup() {
  const orderItems = useSelector(
    (state: RootState) => state.pos.seletedProducts
  );
  const isOrderConfirmOpen = useSelector(
    (state: RootState) => state.pos.isOrderConfirmOpen
  );
  const [createOrder] = useCreateOrderMutation();
  const [remarks, setRemarks] = useState("");

  const orderType = useSelector(
    (state: RootState) => state.pos.selectOrderType
  );
  const tableIds = useSelector(
    (state: RootState) => state.pos.selectedTableIds
  );
  const deliveryAddress = useSelector(
    (state: RootState) => state.pos.selectedDeliveryAddress
  );

  const totalPrice = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleConfirm = async () => {
    await createOrder({
      orderType,
      tableIds,
      deliveryAddress,
      remarks,
      orderItems: orderItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      restaurantId: 1,
    });
  };

  return (
    <Dialog open={isOrderConfirmOpen} onOpenChange={() => {}}>
      <DialogContent className="w-full max-w-[80%] h-full max-h-[90vh] flex flex-col p-6">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Confirm Your Order</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow ">
          <div className="space-y-4">
            <div className="h-[200px] w-full rounded-md border p-4 overflow-y-auto">
              {orderItems?.map((item: any) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-2"
                >
                  <span className="text-sm md:text-base">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="text-sm md:text-base">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center font-bold">
              <span>Total:</span>
              <span>Rs.{totalPrice.toFixed(2)}</span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                id="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Any special instructions?"
                className="min-h-[100px]"
              />
            </div>
            <OrderTypeSelector />
          </div>
        </ScrollArea>
        <DialogFooter className="p-6 pt-2">
          <Button
            type="submit"
            size={"lg"}
            onClick={handleConfirm}
            className="w-full sm:w-auto"
          >
            Confirm Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
