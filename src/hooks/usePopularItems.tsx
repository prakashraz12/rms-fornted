import { useLazyGetPopularItemsQuery } from "@/services/api/analayticsApi";
import { useCallback, useEffect } from "react";

interface PopularItem {
  name: string;
  quantity: number;
  price: number;
  rating: number;
  imageUrl?: {
    url: string;
    publicId: string;
  };
}

const usePopularItems = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const [popularItems, { data, isLoading }] = useLazyGetPopularItemsQuery();

  const getPopularItems = useCallback(async () => {
    await popularItems({
      startDate,
      endDate,
    });
  }, [popularItems, startDate, endDate]);

  useEffect(() => {
    getPopularItems();
  }, []);

  return {
    getPopularItems,
    data: data?.data as PopularItem[],
    isLoading,
  };
};
export default usePopularItems;
