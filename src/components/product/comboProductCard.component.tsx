import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductType } from "@/types/product.type";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { NO_IMAGE } from "@/constant";
import { cn } from "@/lib/utils";

interface ComboProductCardProps {
  product: ProductType;
  selectedProducts: SelectedProductTypes[];
  handleSelectProduct: (productId: number, quantity: number) => void;
}

interface SelectedProductTypes {
  productId: number;
  quantity: number;
}

const ComboProductCard = ({
  product,
  selectedProducts,
  handleSelectProduct,
}: ComboProductCardProps) => {
  const selectedProduct = selectedProducts.find(
    (i) => i.productId === product.id
  );

  const handleIncrement = () => {
    const newQuantity = (selectedProduct?.quantity || 0) + 1;
    handleSelectProduct(product.id, newQuantity);
  };

  const handleDecrement = () => {
    if (selectedProduct?.quantity && selectedProduct.quantity > 1) {
      const newQuantity = selectedProduct.quantity - 1;
      handleSelectProduct(product.id, newQuantity);
    }
  };

  return (
    <Card key={product.id} className="flex items-center rounded-md">
      <CardHeader className="p-2">
        <img
          src={product.image?.url || NO_IMAGE}
          onError={(e) => (e.currentTarget.src = NO_IMAGE)}
          alt={product?.name}
          className={cn(
            "w-20 h-20  rounded-md",
            product?.image?.url ? "object-cover" : "object-contain"
          )}
        />
      </CardHeader>
      <CardContent className=" flex-col gap-2 p-2">
        <CardTitle className="text-sm line-tight">{product.name}</CardTitle>
        <p className="text-sm text-gray-500 mb-2">Rs.{product.price}</p>
        {selectedProduct && (
          <div className="flex items-center gap-3">
            <Button type="button" size={"icon"} onClick={handleDecrement}>
              <Minus />
            </Button>
            <p>{selectedProduct.quantity}</p>
            <Button type="button" size={"icon"} onClick={handleIncrement}>
              <Plus />
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Checkbox
          checked={!!selectedProduct}
          onCheckedChange={() =>
            handleSelectProduct(product.id, selectedProduct ? 0 : 1)
          }
        />
      </CardFooter>
    </Card>
  );
};

export default ComboProductCard;
