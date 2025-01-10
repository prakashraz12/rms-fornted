import {
  setIsOderSelctorOpen,
  setIsOrderConfirmOpen,
  setSelectedProducts,
  setSelectedTableId,
  setSelectOrderType,
} from "@/features/pos/posSlice";
import { RootState } from "@/types/redux.type";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "./use-toast";
import { OrderType } from "@/enums/orderType.enum";
import { useCreateOrderMutation } from "@/services/api/order.api";

const usePlaceOrder = () => {
  const dispatch = useDispatch();

  const [createOrder, { isLoading: isOrderConfirmLoading }] =
    useCreateOrderMutation();

  const remarks = useSelector((state: RootState) => state.order.remarks);
  const orderItems = useSelector(
    (state: RootState) => state.pos.seletedProducts
  );

  const seletedItemsForOrder = useSelector(
    (state: RootState) => state.pos.seletedProducts
  );
  const orderType = useSelector(
    (state: RootState) => state.pos.selectOrderType
  );
  const tableIds = useSelector(
    (state: RootState) => state.pos.selectedTableIds
  );

  console.log(tableIds);
  const deliveryAddress = useSelector(
    (state: RootState) => state.pos.selectedDeliveryAddress
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
        remarks,
      };

      const response = await createOrder(orderData);
      if (response?.data) {
        dispatch(setSelectedProducts([]));
        dispatch(setIsOrderConfirmOpen(false));
        dispatch(setSelectOrderType(null));
        dispatch(setSelectedTableId([]));
        toast({
          title: "Success",
          description: "Order placed successfully",
          variant: "default",
        });
      }
    }
  };

  const handlePlaceOrder = async () => {
    if (seletedItemsForOrder?.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one item",
        variant: "destructive",
      });
      return;
    } else if (
      !orderType ||
      (orderType === OrderType.DINE_IN && tableIds?.length === 0)
    ) {
      dispatch(setIsOderSelctorOpen(true));
      return;
    } else {
      handleConfirmOrder();
    }
  };

  return {
    handlePlaceOrder,
    isOrderConfirmLoading,
  };
};

export default usePlaceOrder;
