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
import { useSelector } from "react-redux";
import { POS_SELECTION_TYPE } from "@/enums/posSelectionType.enum";

const TableContainer = () => {
  const posSelectionType = useSelector(
    (state: RootState) => state.pos.posSelectionType
  );
  const selectedOrders = useSelector(
    (state: RootState) => state.pos.selectedOrders
  );

  const subTotal = selectedOrders?.orderItems?.reduce(
    (total, item) => total + parseInt(item.price) * parseInt(item.quantity),
    0
  );

  const calculatedServiceCharge = (subTotal: number) => {
    return subTotal * 0.15;
  };

  const calculatedTax = subTotal * 0.15; // calculatedTax

  return (
    <div className="w-full h-screen ">
      {/* header */}
      <div className="w-full h-16 ">
        <PosHeader />
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
                    Rs.{subTotal}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Service Charge 15%</TableCell>
                  <TableCell className="text-right">
                    Rs.{calculatedServiceCharge(subTotal)}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Tax 15%</TableCell>
                  <TableCell className="text-right">
                    Rs.{calculatedTax}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={2} className="font-bold">
                    Total
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    Rs.
                    {(
                      subTotal +
                      calculatedServiceCharge(subTotal) +
                      calculatedTax
                    ).toFixed(2)}
                  </TableCell>
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
