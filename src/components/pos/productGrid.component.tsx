import { ProductType } from "@/types/product.type";
import ProductCard from "./productCard.component";

export function ProductGrid({
  filteredProducts: products,
}: {
  filteredProducts: ProductType[];
}) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
      {products?.map((product) => (
        <ProductCard productItem={product} key={product?.id} />
      ))}
    </div>
  );
}
