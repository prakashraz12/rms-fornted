import OrderTable from "./orderList.component";
import POSButtons from "./posButton.component";
import PosActionBottomContainer from "./posActionBottomContainer.component";
import {
  Table,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import PosHeader from "./posHeader.component";
import { RootState } from "@/types/redux.type";
import { useDispatch, useSelector } from "react-redux";
import { POS_SELECTION_TYPE } from "@/enums/posSelectionType.enum";
import { calculateTotal } from "@/utils/getGrandToatlAmount";

const TableContainer = () => {
  const posSelectionType = useSelector(
    (state: RootState) => state.pos.posSelectionType
  );


  const discount = useSelector(
    (state: RootState) => state.pos.discount
  );
  const paymentMethod = useSelector(
    (state: RootState) => state.pos.selectPaymentMethod
  );

  const dispatch = useDispatch();
  const selectedOrders = useSelector(
    (state: RootState) => state.pos.selectedOrders
  );


  const calculatedGrandToatl = calculateTotal({
    subTotal: selectedOrders?.totalAmount,
    discount: discount,
    serviceChargeRate: 0.15,
    vatRate: 0.15,
    taxRate: 0.15,
    applyVat: true,
  });

  const { grandTotal, serviceCharge, discountAmount, calculatedTax } =
    calculatedGrandToatl;


  return (
    <div className="w-full h-screen ">
      {/* header */}
      <div className="w-full h-16 ">
        <PosHeader userName="Prakash Raz Shreshtha" userRole="POS User" email="rzprakash16@gmail.com" />
      </div>
      {/* main product list */}
      <div className="flex flex-col justify-start h-[calc(100vh-4rem)] ">
        <POSButtons />
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2">Item</TableHead>
                <TableHead className="text-center w-1/4">Quantity</TableHead>
                <TableHead className="text-right w-1/10">Price</TableHead>
                <TableHead className="w-1/10"></TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </div>
        <OrderTable />
        {posSelectionType === POS_SELECTION_TYPE.EXISTING && (
          <div className="bg-background  max-h-[220px]">
            <Table>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell className="text-right font-bold">
                    Rs.{parseInt(selectedOrders?.totalAmount)?.toFixed(2)}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={2}>Service Charge 15%</TableCell>
                  <TableCell className="text-right">
                    Rs.{serviceCharge.toFixed(2)}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>

                {discount && (
                  <TableRow>
                    <TableCell colSpan={2}>Discount: <span className="border-b-2 border-dashed border-gray-400">{discount?.name}</span></TableCell>
                    <TableCell className="text-right font-bold">
                      (- Rs.{discountAmount.toFixed(2)})
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )}

                <TableRow>
                  <TableCell colSpan={2}>Tax 15%</TableCell>
                  <TableCell className="text-right">
                    Rs.{calculatedTax?.toFixed(2)}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={2} className="font-bold">
                    Total
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    Rs.
                    {grandTotal.toFixed(2)}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} className="font-bold flex gap-2">
                    Payment Method:
                    <span
                      onClick={() =>
                        dispatch({
                          type: "pos/setIsSelectPaymentMethodOpen",
                          payload: true,
                        })
                      }
                      className="border-b-2 border-dashed border-gray-400 cursor-pointer"
                    >
                      {paymentMethod === null ? "N/A" : paymentMethod}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-bold"></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        )}
        <PosActionBottomContainer />
      </div>
    </div>
  );
};

export default TableContainer;
