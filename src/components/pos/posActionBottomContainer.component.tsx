import { HandCoins, HandPlatter, Loader2, Pause, Percent, X } from "lucide-react";
import { Button } from "../ui/button";
import useOrder from "@/hooks/useOrder";
import { RootState } from "@/types/redux.type";
import { POS_SELECTION_TYPE } from "@/enums/posSelectionType.enum";
import { useSelector } from "react-redux";
import {
  useCompleteOrderMutation,
  useUpdateOrderMutation,
} from "@/services/api/order.api";
import { PaymentSelector } from "./paymentMethodSelctor.component";
import { useDispatch } from "react-redux";
import { setHoldOrder, setPosSelectionType, setSelectedProducts, setSelectPaymentMethod } from "@/features/pos/posSlice";
import { selectedOrdersType } from "@/types/selectedOrders.type";
import { DiscountPopup } from "./addDiscount.component";
import { useState } from "react";

const PosActionBottomContainer = () => {

  const discount = useSelector((state: RootState) => state.pos.discount);
  const dispatch = useDispatch();

  const [addDiscount, setAddDiscount] = useState(false);

  const selectedProducts = useSelector(
    (state: RootState) => state.pos.seletedProducts
  );

  const paymentMethod = useSelector(
    (state: RootState) => state.pos.selectPaymentMethod
  );

  const tableIds = useSelector(
    (state: RootState) => state.pos.selectedTableIds
  );

  const deliveryAddress = useSelector(
    (state: RootState) => state.pos.selectedDeliveryAddress
  );

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
        isDiscountApplied: discount !== null,
        discountType: discount?.type,
        discountAmount: discount?.value,
        discountId: discount?.type === "FLAT" ? null : discount?.id

      });
    } else {
      dispatch(setSelectPaymentMethod(true));
    }
  };

  const handleUpdateOrder = async () => {
    await updateOrder({
      data: {
        orderItems: selectedOrders.orderItems.map((item: selectedOrdersType) => ({
          productId: item.productId,
          quantity: item.quantity,
          variantId: item.variantId,
        })),
        orderType: selectedOrders.orderType,
        tableIds: tableIds,
        deliveryAddress: deliveryAddress,
      },
      id: selectedOrders.id,
    });
  };

  const handleHoldOrder = () => {
    dispatch(setSelectedProducts([]));
    dispatch(setHoldOrder(selectedProducts));
    dispatch(setPosSelectionType("NEW"));
  };



  const isLoading = isCompleteOrderLoading || isUpdateOrderLoading;

  return (
    <div className=" h-16 flex items-center justify-center border-r ">
      {posSelectionType === POS_SELECTION_TYPE.EXISTING ? (
        <>
          <Button
            onClick={() => setAddDiscount(true)}

            className="w-full bg-blue-500 hover:bg-blue-600 h-16 rounded-none"
          >
            Add Discount <Percent />
          </Button>
          <Button
            onClick={handleUpdateOrder}
            className="w-full bg-yellow-500 hover:bg-yellow-600 h-16 rounded-none outline-none border-none"
          >
            {isUpdateOrderLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Update Order <Pause />
              </>
            )}
          </Button>
          <Button
            disabled={isLoading}
            className="w-full bg-green-500 h-16 rounded-none border-none hover:bg-green-600 outline-none"
            onClick={handleCompleteOrder}
          >
            Pay <HandCoins />
          </Button>
          <PaymentSelector />
          <DiscountPopup isOpen={addDiscount} onClose={() => setAddDiscount(false)} />
        </>
      ) : (
        <>
          <Button variant={"destructive"} className="w-full  h-16 rounded-none" onClick={()=>dispatch(setSelectedProducts([]))}>
            Clear <X/>
          </Button>
          <Button
            onClick={handleHoldOrder}
            className="w-full bg-yellow-500 hover:bg-yellow-600 h-16 rounded-none outline-none border-none"
          >
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
