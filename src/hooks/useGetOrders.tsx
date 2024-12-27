import { useLazyGetOrderByRestaurantIdQuery } from "@/services/api/order.api";
import { useCallback, useEffect, useState } from "react";

const useGetOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
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
    const { data } = await getOrders({
      page: 1,
      limit: 100,
      restaurantId: 1,
      startDate: startDateOffset,
      endDate: endDateOffset,
    });

    if (data) {
      setOrders(data?.data?.orders);
    }
  }, [page, setPage]);

  useEffect(() => {
    getTodayOrders();
  }, []);

  return {
    orders,
  };
};

export default useGetOrders;
