import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { RootState } from "@/types/redux.type";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedOrders, setSeletedProducts } from "@/features/pos/posSlice";
import { POS_SELECTION_TYPE } from "@/enums/posSelectionType.enum";
import { selectedOrdersType } from "@/types/selectedOrders.type";

export default function OrderTable() {
  const dispatch = useDispatch();

  const selectedProducts = useSelector((state: RootState) => {
    return state.pos.seletedProducts;
  });

  const selectedOrders = useSelector((state: RootState) => {
    return state.pos.selectedOrders;
  });

  const posSelectionType = useSelector((state: RootState) => {
    return state.pos.posSelectionType;
  });

  const updateQuantity = (id: string, increment: boolean) => {
    if (posSelectionType === POS_SELECTION_TYPE.EXISTING) {
      dispatch(
        setSelectedOrders({
          ...selectedOrders,
          orderItems: selectedOrders?.orderItems?.map(
            (item: selectedOrdersType) => {
              if (item.productId === parseInt(id)) {
                return {
                  ...item,
                  quantity: increment
                    ? item.quantity + 1
                    : item.quantity > 1
                      ? item.quantity - 1
                      : 1,
                };
              }
              return item;
            }
          ),
        })
      );
    } else {
      dispatch(
        setSeletedProducts(
          selectedProducts?.map((item) => {
            if (item.productId === parseInt(id)) {
              return {
                ...item,
                quantity: increment
                  ? item.quantity + 1
                  : item.quantity > 1
                    ? item.quantity - 1
                    : 1,
              };
            }
            return item;
          })
        )
      );
    }
  };

  const removeItem = (id: string) => {
    posSelectionType === POS_SELECTION_TYPE.EXISTING
      ? dispatch(
          setSelectedOrders({
            ...selectedOrders,
            orderItems: selectedOrders?.orderItems?.filter(
              (item: selectedOrdersType) => item.productId !== parseInt(id)
            ),
          })
        )
      : dispatch(
          setSeletedProducts(
            selectedProducts?.filter((item) => item.productId !== parseInt(id))
          )
        );
  };

  const orders =
    posSelectionType === POS_SELECTION_TYPE.EXISTING
      ? selectedOrders?.orderItems
      : selectedProducts;
  return (
    <>
      <div className="flex-grow overflow-auto h-[calc(100vh-26rem)]">
        <Table>
          <TableBody>
            {orders?.map((item: selectedOrdersType) => (
              <TableRow key={item.productId}>
                <TableCell className="font-medium w-1/2">
                  {item?.name}
                </TableCell>
                <TableCell className="w-1/4">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-xl shadow-md"
                      onClick={() =>
                        updateQuantity(item.productId?.toString(), false)
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-bold">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-xl shadow-md"
                      onClick={() =>
                        updateQuantity(item.productId?.toString(), true)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-right w-1/10">
                  Rs.{(item.price * item.quantity)?.toFixed(2)}
                </TableCell>
                <TableCell className="w-1/8">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-10 w-10 rounded-xl"
                    onClick={() => removeItem(item.productId?.toString())}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
