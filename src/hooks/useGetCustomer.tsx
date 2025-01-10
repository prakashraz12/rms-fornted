import { useLazyGetCoustomerQuery } from "@/services/api/customer.api";
import { useCallback, useEffect, useState } from "react";

const useGetMineCoustomer = () => {
  const [coustomers, setCustomers] = useState<any[]>([]);

  const [getCoustomer, { isLoading }] = useLazyGetCoustomerQuery();

  const getMineCoustomerQuery = useCallback(async () => {
    const { data } = await getCoustomer({});

    if (data?.data) {
      setCustomers(data?.data?.data);
    }
  }, [getCoustomer]);

  useEffect(() => {
    getMineCoustomerQuery();
  }, []);

  return {
    coustomers,
    getMineCoustomerQuery,
    isLoading,
  };
};

export default useGetMineCoustomer;
