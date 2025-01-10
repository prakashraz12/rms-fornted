import { useGetDiscountMutation } from "@/services/api/discount";
import { RootState } from "@/types/redux.type";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

const useGetDiscount = ({ isActive }: { isActive: boolean }) => {
  const discount = useSelector((state: RootState) => state.discount.discounts);
  const [getDiscount] = useGetDiscountMutation();

  const fetchDiscountHandler = useCallback(async () => {
    await getDiscount({ isActive });
  }, [getDiscount, isActive]);

  useEffect(() => {
    if (discount?.length === 0) {
      fetchDiscountHandler();
    }
  }, [discount]);

  return { discount, fetchDiscountHandler };
};

export default useGetDiscount;
