import { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { OrderTypeSelector } from "./orderTypeSelection.component";
import { useCreateOrderMutation } from "@/services/api/order.api";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { setIsOrderConfirmOpen, setSelectedProducts } from "@/features/pos/posSlice";
import { OrderType } from "@/enums/orderType.enum";

export function OrderConfirmationPopup() {
  const dispatch = useDispatch();
  const orderItems = useSelector(
    (state: RootState) => state.pos.seletedProducts
  );
  const isOrderConfirmOpen = useSelector(
    (state: RootState) => state.pos.isOrderConfirmOpen
  );
  
  const [
    createOrder,
    {
      isLoading: isOrderConfirmLoading
    },
  ] = useCreateOrderMutation();
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

  const totalPrice = orderItems?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleConfirmOrder = async () => {
    if (orderType === OrderType.DELIVERY && !deliveryAddress) {
      toast({
        title: "Error",
        description: "Please select delivery address",
        variant: "destructive",
      });
    } else if (orderType === OrderType.DINE_IN && tableIds.length === 0) {
      toast({
        title: "Error",
        description: "Please select table",
        variant: "destructive",
      });
    } else {
      const orderData = {
        orderType,
        tableIds,
        deliveryAddress,
        orderItems: orderItems?.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          variantId: item.variantId,
        })),
        restaurantId: 1,
      };

      const response = await createOrder(orderData);
      if (response?.data) {
        dispatch(setSelectedProducts([]));
        dispatch(setIsOrderConfirmOpen(false));
      }


    }
  };


  return (
    <Dialog
      open={isOrderConfirmOpen}
      onOpenChange={() => {
        dispatch(setIsOrderConfirmOpen(false));
      }}
    >
      <DialogContent className="w-full lg:max-w-[50%] h-full max-h-[90vh] flex flex-col p-4">
        <DialogHeader className="p-2">
          <DialogTitle>Confirm Your Order</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow ">
          <div className="space-y-4">
            <div className="h-[200px] w-full rounded-md border p-4 overflow-y-auto">
              {orderItems?.map((item: any, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-2"
                >
                  <span className="text-sm md:text-base">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="text-sm md:text-base">
                    Rs.{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center font-bold">
              <span>Total:</span>
              <span>Rs.{totalPrice?.toFixed(2)}</span>
            </div>
            <div className="space-y-2 p-2">
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
        <DialogFooter>
          <Button
            disabled={isOrderConfirmLoading}
            type="submit"
            size={"lg"}
            onClick={handleConfirmOrder}
            className="w-full h-12"
          >
            {isOrderConfirmLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Confirm Order"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
