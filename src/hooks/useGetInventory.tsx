import { useLazyGetInventoryListQuery } from "@/services/api/inventoryApi";
import { InventoryItems } from "@/types/inventory.type";
import { useCallback, useEffect, useState } from "react";

const useGetInventory = ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  const [inventory, setInventory] = useState<InventoryItems[]>([]);
  const [trigger, { isLoading, isError }] = useLazyGetInventoryListQuery();

  const fetchInventory = useCallback(async () => {
    const { data } = await trigger({ page, limit, search });
    if (data?.data) {
      setInventory(data?.data?.inventory);
    }
  }, [page, limit, search]);

  useEffect(() => {
    fetchInventory();
  }, [page, limit, search]);

  return {
    inventory,
    fetchInventory,
    isLoading,
    isError,
  };
};

export default useGetInventory;
