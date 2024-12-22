import { ProductCreationForm } from "@/components/product/createProduct.component";
import ProductTable from "@/components/product/productList.component";
import { useLazyGetProductByRestaurantIdQuery } from "@/services/api/product.api";
import { useCallback, useEffect, useState } from "react";

const Products = () => {
  return (
    <div className="container mx-auto mt-6">
      <h1 className="text-xl font-semibold">Product Management</h1>
      <p className="text-sm">Manage your food items form here.</p>
      <ProductTable />
    </div>
  );
};

export default Products;
