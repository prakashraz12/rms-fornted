import { useLazyGetFloorByRestaurantIdQuery } from "@/services/api/floorApi";
import { FloorType } from "@/types/floor.type";
import { useCallback, useEffect, useState } from "react";

const useGetTables = () => {
  const [floorData, setFloorData] = useState<FloorType[]>([]);

  const [floors, { isSuccess: isFloorFetched, isLoading: isFloorFetching }] =
    useLazyGetFloorByRestaurantIdQuery();

  const getFloors = useCallback(async () => {
    const response = await floors(1);

    if (response?.data) {
      setFloorData(response.data.data);
    }
  }, []);

  useEffect(() => {
    getFloors();
  }, []);

  return {
    floorData,
    isFloorFetched,
    isFloorFetching,
    setFloorData,
  };
};

export default useGetTables;
