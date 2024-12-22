import { ProductType } from "@/types/product.type";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { NO_IMAGE } from "@/constant";



const ProductCard = ({ productItem }: { productItem: ProductType }) => {
  return (
    <Card
      key={productItem.id}
      className="overflow-hidden rounded-xl hover:shadow-lg transition-all duration-300"
    >
      <CardContent className="p-2 rounded-xl">
        <div className="h-[150px] mb-3 relative">
          <img
            src={productItem.image?.url || ""}
            onError={(e) => (e.currentTarget.src = NO_IMAGE)}
            alt={productItem.name}
            className="object-cover rounded-xl h-full w-full "
          />
          <Badge
            variant="warning"
            className={cn(
              "font-normal",
              "absolute top-2 right-2"
            )}
          >
            {productItem.category?.name}
          </Badge>
        </div>
        <div className="space-y-1 text-sm p-1">
          <h3 className="leading-none line-clamp-1">
            {productItem.name}
          </h3>
          <p className="font-bold">Rs.{productItem.price}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
