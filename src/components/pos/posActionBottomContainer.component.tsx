import { HandCoins, HandPlatter, Loader2, Pause, Percent } from "lucide-react";
import { Button } from "../ui/button";
import useOrder from "@/hooks/useOrder";
import { RootState } from "@/types/redux.type";
import { POS_SELECTION_TYPE } from "@/enums/posSelectionType.enum";
import { useSelector } from "react-redux";
import { useCompleteOrderMutation, useUpdateOrderMutation } from "@/services/api/order.api";
import { useState } from "react";
import { PaymentSelector } from "./paymentMethodSelctor.component";
import { PaymentMethod } from "@/enums/paymentMethod.enum";

const PosActionBottomContainer = () => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );
  const [isPaymentMethodSelectorOpen, setIsPaymentMethodSelectorOpen] =
    useState(false);

  const { handlePlaceOrder } = useOrder();

  const [completeOrder, { isLoading: isCompleteOrderLoading }] =
    useCompleteOrderMutation();
  const [updateOrder, { isLoading: isUpdateOrderLoading }] =
    useUpdateOrderMutation();

  const selectedOrders = useSelector((state: RootState) => {
    return state.pos.selectedOrders;
  });


  const posSelectionType = useSelector(
    (state: RootState) => state.pos.posSelectionType
  );

  const handleCompleteOrder = async () => {
    if (paymentMethod) {
      await completeOrder({
        orderId: selectedOrders.id,
        vat: 0,
        serviceCharges: 0,
        paymentMethod: paymentMethod,
      });
    } else {
      setIsPaymentMethodSelectorOpen(true);
    }
  };


  const handleUpdateOrder = async () => {
    await updateOrder({
      data: {
        orderItems: selectedOrders.orderItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
      id: selectedOrders.id
    });
  };

  const isLoading =
    isCompleteOrderLoading || isUpdateOrderLoading || isPaymentMethodSelectorOpen;
  return (
    <div className=" h-16 flex items-center justify-center border-r ">
      {posSelectionType === POS_SELECTION_TYPE.EXISTING ? (
        <>
          <Button disabled className="w-full bg-blue-500 hover:bg-blue-600 h-16 rounded-none">
            Add Discount <Percent />
          </Button>
          <Button onClick={handleUpdateOrder} className="w-full bg-yellow-500 hover:bg-yellow-600 h-16 rounded-none outline-none border-none">
            {
              isUpdateOrderLoading ? <Loader2 className="animate-spin" /> : <>Update Order <Pause /></>
            }
          </Button>
          <Button
            disabled={isLoading}
            className="w-full bg-green-500 h-16 rounded-none border-none hover:bg-green-600 outline-none"
            onClick={handleCompleteOrder}
          >
            Pay <HandCoins />
          </Button>
          <PaymentSelector
            isOpen={isPaymentMethodSelectorOpen}
            onClose={() => setIsPaymentMethodSelectorOpen(false)}
            onSelectPayment={setPaymentMethod}
            selectedMethod={paymentMethod}
            setSelectedMethod={setPaymentMethod}
          />
        </>
      ) : (
        <>
          <Button className="w-full bg-blue-500 hover:bg-blue-600 h-16 rounded-none">
            Add Discount <Percent />
          </Button>
          <Button className="w-full bg-yellow-500 hover:bg-yellow-600 h-16 rounded-none outline-none border-none">
            Hold Order <Pause />
          </Button>
          <Button
            className="w-full bg-green-500 h-16 rounded-none border-none hover:bg-green-600 outline-none"
            onClick={handlePlaceOrder}
          >
            Place Order <HandPlatter />
          </Button>
        </>
      )}
    </div>
  );
};

export default PosActionBottomContainer;
