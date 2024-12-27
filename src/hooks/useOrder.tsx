import { RootState } from "@/types/redux.type";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "./use-toast";
import { setIsOrderConfirmOpen } from "@/features/pos/posSlice";

const useOrder = () => {
  const dispatch = useDispatch();
  const orderType = useSelector(
    (state: RootState) => state.pos.selectOrderType
  );
  const seletedItemsForOrder = useSelector(
    (state: RootState) => state.pos.seletedProducts
  );

  const handlePlaceOrder = async () => {
    if (seletedItemsForOrder.length === 0) {
      toast({
        title: "Error",
        description: "No items selected for order",
        variant: "destructive",
      });
      return;
    } else if (!orderType) {
      toast({
        title: "Error",
        description: "Please select order type",
        variant: "destructive",
      });
      return;
    } else {
      dispatch(setIsOrderConfirmOpen(true));
    }
  };

  return {
    handlePlaceOrder,
  };
};

export default useOrder;
