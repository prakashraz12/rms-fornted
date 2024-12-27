import { ProductType } from "@/types/product.type";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { NO_IMAGE } from "@/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedOrders, setSeletedProducts } from "@/features/pos/posSlice";
import { RootState } from "@/types/redux.type";
import { POS_SELECTION_TYPE } from "@/enums/posSelectionType.enum";

const ProductCard = ({ productItem }: { productItem: ProductType }) => {


  const selectedProducts = useSelector((state: RootState) => {
    return state.pos.seletedProducts;
  });



  const dispatch = useDispatch();
  const posSelectionType = useSelector(
    (state: RootState) => state.pos.posSelectionType
  );

  const selectedOrders = useSelector(
    (state: RootState) => state.pos.selectedOrders
  );
  const previousProducts = useSelector(
    (state: RootState) => state.pos.seletedProducts
  );

  const isProductSelected = () => {
    return selectedProducts.some((item) => item.productId === productItem.id);
  };

  const handleSelectProduct = () => {
    if (posSelectionType === POS_SELECTION_TYPE.EXISTING) {
      dispatch(
        setSelectedOrders({
          ...selectedOrders,
          orderItems: [
            ...selectedOrders?.orderItems,
            {
              productId: productItem.id,
              name: productItem.name,
              quantity: 1,
              price: productItem.price,
            },
          ],
        })
      );
    } else if (isProductSelected()) {
      dispatch(
        setSeletedProducts(
          selectedProducts.map((item) => {
            if (item.productId === productItem.id) {
              return {
                ...item,
                quantity: item.quantity + 1,
              };
            }
            return item;
          })
        )
      );
    } else {
      dispatch(
        setSeletedProducts([
          ...previousProducts,
          {
            productId: productItem.id,
            name: productItem.name,
            price: productItem.price,
            quantity: 1,
          },
        ])
      );
    }
  };

    return (
      <Card
        key={productItem.id}
        className="overflow-hidden rounded-xl hover:shadow-lg transition-all duration-300"
        onClick={handleSelectProduct}
      >
        <CardContent className="p-2 rounded-xl">
          <div className="h-[150px] mb-3 relative">
            <img
              src={productItem.image?.url || ""}
              onError={(e) => (e.currentTarget.src = NO_IMAGE)}
              alt={productItem.name}
              className="object-cover rounded-xl h-full w-full "
            />
            {isProductSelected() &&
              selectedProducts.find((item) => item.productId === productItem.id)
                ?.quantity && (
                <Badge
                  variant={"destructive"}
                  className={cn(
                    "font-semibold",
                    "absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full",
                    " text-destructive-foreground"
                  )}
                >
                  {isProductSelected() &&
                    selectedProducts.find(
                      (item) => item.productId === productItem.id
                    )?.quantity}
                </Badge>
              )}
          </div>
          <div className="space-y-2 text-sm ">
            <h3 className="leading-none line-clamp-1">{productItem.name}</h3>
            <Badge className="font-semibold" variant={"secondary"}>
              {productItem.category?.name}
            </Badge>
            <p className="font-bold">Rs.{productItem.price}</p>
          </div>
        </CardContent>
      </Card>
    );
  };

  export default ProductCard;
