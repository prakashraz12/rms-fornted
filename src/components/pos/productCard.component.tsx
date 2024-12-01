import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { getCategoryColor } from "@/utils/getCategoryColor.util";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

const ProductCard = ({ productItem }: { productItem: Product }) => {
  return (
    <Card
      key={productItem.id}
      className="overflow-hidden rounded-xl hover:shadow-lg transition-all duration-300"
    >
      <CardContent className="p-2 rounded-xl">
        <div className="aspect-square mb-3 relative">
          <img
            src={productItem.image}
            alt={productItem.name}
            className="object-cover rounded-xl h-full w-full "
          />
          <Badge
            variant="secondary"
            className={cn(
              "font-normal",
              "absolute top-2 right-2",
              getCategoryColor(productItem.category)
            )}
          >
            {productItem.category}
          </Badge>
        </div>
        <div className="space-y-1 text-sm p-1">
          <h3 className="font-medium leading-none line-clamp-1">{productItem.name}</h3>
          <p className="font-medium">${productItem.price.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
