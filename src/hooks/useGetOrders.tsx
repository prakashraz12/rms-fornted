import { setOrder } from "@/features/order/orderSlice";
import { useLazyGetOrderByRestaurantIdQuery } from "@/services/api/order.api";
import { RootState } from "@/types/redux.type";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetOrders = () => {

  const dispatch = useDispatch();

  const orders = useSelector(
    (state: RootState) => state.order.orders
  );

  const previousOrders = useSelector(
    (state: RootState) => state.order.orders
  )

  const [page, setPage] = useState<number>(1);
  const [getOrders] = useLazyGetOrderByRestaurantIdQuery();

  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  const startDateOffset = new Date(
    startDate.getTime() - startDate.getTimezoneOffset() * 60000
  ).toISOString();

  const endDate = new Date();
  endDate.setHours(23, 0, 0, 0);
  const endDateOffset = new Date(
    endDate.getTime() - endDate.getTimezoneOffset() * 60000
  ).toISOString();

  const getTodayOrders = useCallback(async () => {
    await getOrders({
      page: 1,
      limit: 100,
      restaurantId: 1,
      startDate: startDateOffset,
      endDate: endDateOffset,
    });

  }, [page, setPage]);

  useEffect(() => {
    if (previousOrders.length === 0) {
      getTodayOrders();
    } else {
      dispatch(setOrder(previousOrders))
    }
  }, [previousOrders]);

  return {
    orders,
  };
};

export default useGetOrders;
