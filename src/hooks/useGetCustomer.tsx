import { useLazyGetCoustomerQuery } from "@/services/api/customer.api";
import { useCallback, useEffect, useState } from "react";

interface CustomerParams {
  customerName?: string;
  address?: string;
  phone?: string;
  sortBy?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

const useGetMineCoustomer = ({
  customerName = "",
  address = "",
  phone = "",
  sortBy = "",
  startDate,
  endDate,
  page = 1,
  limit = 10,
}: CustomerParams = {}) => {
  const [coustomers, setCustomers] = useState<any[]>([]);

  const [getCoustomer, { data, isLoading, isFetching }] =
    useLazyGetCoustomerQuery();

  const getMineCoustomerQuery = useCallback(async () => {
    const { data } = await getCoustomer({
      customerName,
      address,
      phone,
      sortBy,
      startDate,
      endDate,
      page,
      limit,
    });

    if (data?.data) {
      setCustomers(data?.data?.data);
    }
  }, [
    getCoustomer,
    customerName,
    address,
    phone,
    sortBy,
    startDate,
    endDate,
    page,
    limit,
  ]);

  useEffect(() => {
    getMineCoustomerQuery();
  }, [page, limit]);

  return {
    coustomers,
    getMineCoustomerQuery,
    isLoading,
    isFetching,
    data,
  };
};

export default useGetMineCoustomer;
