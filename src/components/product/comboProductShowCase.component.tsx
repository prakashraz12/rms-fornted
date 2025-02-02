import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useLazyGetProductByRestaurantIdQuery } from "@/services/api/product.api";
import { Input } from "../ui/input";
import { ProductType } from "@/types/product.type";
import ComboProductCard from "./comboProductCard.component";

interface HorizontalCardListProps {
  selectedProducts: SelectedProductTypes[];
  setSelectedProducts: (type: any) => void;
}

interface SelectedProductTypes {
  productId: number;
  quantity: number;
}

export const ComboProductList: React.FC<HorizontalCardListProps> = ({
  selectedProducts,
  setSelectedProducts,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const [getProducts, { data: products }] =
    useLazyGetProductByRestaurantIdQuery();

  const fetchProducts = useCallback(
    async (pageNumber: number, limitSize: number, search?: string) => {
      await getProducts({
        page: pageNumber,
        limit: limitSize,
        search,
      });
    },
    [page, setPage, limit, setLimit]
  );

  const handleSelectProduct = (productId: number, quantity: number) => {
    setSelectedProducts((prevSelected: SelectedProductTypes[]) => {
      const productIndex = prevSelected.findIndex(
        (p) => p.productId === productId
      );
      if (quantity === 0) {
        return prevSelected.filter((p) => p.productId !== productId);
      }
      if (productIndex !== -1) {
        const updatedProducts = [...prevSelected];
        updatedProducts[productIndex].quantity = quantity;
        return updatedProducts;
      }
      return [...prevSelected, { productId, quantity: 1 }];
    });
  };

  const handleSearch = async () => {
    fetchProducts(1, 10, searchTerm);
  };
  useEffect(() => {
    fetchProducts(page, limit);
  }, [page]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full "
        />
        <Button onClick={handleSearch} type="button">
          Search
        </Button>
      </div>

      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products?.data?.data?.map((product: ProductType) => (
          <ComboProductCard
            key={product?.id}
            selectedProducts={selectedProducts}
            product={product}
            handleSelectProduct={handleSelectProduct}
          />
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          {products?.data?.meta?.currentPage !== 1 && (
            <PaginationItem className="cursor-pointer">
              <PaginationPrevious
                onClick={() => {
                  setPage(page - 1);
                }}
              />
            </PaginationItem>
          )}
          {products?.data?.meta?.currentPage <
            products?.data?.meta?.totalPages && (
            <PaginationItem className="cursor-pointer">
              <PaginationNext onClick={() => setPage(page + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
