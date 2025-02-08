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

import { cn } from "@/lib/utils";
import { useState } from "react";
import { NumericInputPopup } from "./numberInput";
import { setServiceChargeRate, setVatRate } from "@/features/pos/posSlice";

const TableContainer = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const role = useSelector((state: RootState) => state.auth.role);

  const serviceChargeRate = useSelector(
    (state: RootState) => state.pos.serviceChargeRate
  );

  const [vatRateOpen, setVatRateOpen] = useState(false);
  const [serviceChargeOpen, setServiceChargeOpen] = useState(false);

  const vatRate = useSelector((state: RootState) => state.pos.vatRate);

  const posSelectionType = useSelector(
    (state: RootState) => state.pos.posSelectionType
  );

  const discount = useSelector((state: RootState) => state.pos.discount);

  const paymentMethod = useSelector(
    (state: RootState) => state.pos.selectPaymentMethod
  );

  const dispatch = useDispatch();
  const selectedOrders = useSelector(
    (state: RootState) => state.pos.selectedOrders
  );

  const calculatedDiscountAmount =
    discount?.type === "PERCENTAGE"
      ? parseInt(selectedOrders?.totalAmount) * (discount?.value / 100) || 0
      : discount?.value || 0;

  const calculateServiceCharge =
    (selectedOrders?.totalAmount - calculatedDiscountAmount) *
      (serviceChargeRate / 100) || 0;

  const calculateVat =
    (selectedOrders?.totalAmount -
      calculatedDiscountAmount +
      calculateServiceCharge) *
      (vatRate / 100) || 0;

  const grandTotal =
    selectedOrders?.totalAmount -
    calculatedDiscountAmount +
    calculateServiceCharge +
    calculateVat;

  return (
    <div className={cn("w-full h-screen")}>
      {/* header */}
      <div className="w-full h-16 flex items-center ">
        <PosHeader
          userName={user?.name || ""}
          userRole={role || ""}
          email={user?.email || ""}
          avatarUrl={user?.profileImage?.url || ""}
        />
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
                {discount && (
                  <TableRow>
                    <TableCell colSpan={2}>
                      Discount:{" "}
                      <span className="border-b-2 border-dashed border-gray-400">
                        {discount?.name}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      (- Rs.{calculatedDiscountAmount?.toFixed(2)})
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )}

                <TableRow>
                  <TableCell colSpan={2}>
                    Service Charge:{" "}
                    <span
                      onClick={() => setServiceChargeOpen(true)}
                      className="border-b-2 border-dashed border-gray-400 cursor-pointer"
                    >
                      {serviceChargeRate?.toFixed(2)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    Rs.{calculateServiceCharge?.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <NumericInputPopup
                      isOpen={serviceChargeOpen}
                      onClose={() => setServiceChargeOpen(false)}
                      onSubmit={(value) => {
                        dispatch(setServiceChargeRate(parseFloat(value)));
                        setServiceChargeOpen(false);
                      }}
                      title="Enter Service Charge Rate"
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={2}>
                    VAT:{" "}
                    <span
                      onClick={() => setVatRateOpen(true)}
                      className="border-b-2 border-dashed border-gray-400 cursor-pointer"
                    >
                      {vatRate?.toFixed(2)}%
                    </span>{" "}
                  </TableCell>
                  <TableCell className="text-right">
                    Rs.{calculateVat?.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <NumericInputPopup
                      isOpen={vatRateOpen}
                      onClose={() => setVatRateOpen(false)}
                      onSubmit={(value) => {
                        dispatch(setVatRate(parseFloat(value)));
                        setVatRateOpen(false);
                      }}
                      title="Enter VAT Rate"
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={2} className="font-bold">
                    Total
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    Rs.
                    {grandTotal?.toFixed(2)}
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
