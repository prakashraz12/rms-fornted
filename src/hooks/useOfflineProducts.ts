import { useEffect, useState } from "react";
import { ProductType } from "@/types/product.type";
import { POS_PRODUCT_KEYS } from "@/components/pos/keys/keys";

export const useOfflineProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Load products from local storage or API
  const fetchProducts = async () => {
    setIsFetching(true);
    try {
      if (isOnline) {
        // Fetch from API when online
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
        // Store in localStorage for offline use
        localStorage.setItem(POS_PRODUCT_KEYS, JSON.stringify(data));
      } else {
        // Load from localStorage when offline
        const storedProducts = localStorage.getItem(POS_PRODUCT_KEYS);
        if (storedProducts) {
          setProducts(JSON.parse(storedProducts));
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      // Fallback to localStorage on error
      const storedProducts = localStorage.getItem(POS_PRODUCT_KEYS);
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
    } finally {
      setIsFetching(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchProducts();
  }, [isOnline]);

  return {
    products,
    isFetching,
    isOnline,
    refetchProducts: fetchProducts,
  };
};
