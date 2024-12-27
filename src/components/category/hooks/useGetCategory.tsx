import { useLazyGetCategoryByRestaurantIdQuery } from "@/services/api/category.api";
import { Category } from "@/types/category.type";
import { useCallback, useEffect, useState } from "react";

const useGetCategory = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const [
    getCategory,
    {
      data: CategoryData,
      isLoading: isCategoryFetching,
      isSuccess: isCategoryFetched,
    },
  ] = useLazyGetCategoryByRestaurantIdQuery();
  const fetchCategory = useCallback(async () => {
    await getCategory({});
  }, [getCategory]);

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    if (isCategoryFetched) {
      setCategory([{ name: "All", id: "All" }, ...CategoryData?.data]);
    }
  }, [isCategoryFetched]);

  return {
    category,
    isCategoryFetching,
  };
};

export default useGetCategory;
