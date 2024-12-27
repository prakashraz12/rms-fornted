import { ProductType } from "@/types/product.type";
import { useCallback, useMemo, useState } from "react";

interface UseFilterSearchProps {
  products: ProductType[];
  initialCategory?: string;
}

const useFilterSearch = ({
  products,
  initialCategory = "All",
}: UseFilterSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query.toLowerCase());
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.trim().toLowerCase().includes(searchQuery) ||
        product.description?.toLowerCase().includes(searchQuery) ||
        product.category?.name.toLowerCase().includes(searchQuery);

      const matchesCategory =
        selectedCategory === "All" ||
        product.category?.id?.toString() === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  return {
    searchQuery,
    selectedCategory,
    filteredProducts,
    handleSearch,
    handleCategoryChange,
  };
};

export default useFilterSearch;
