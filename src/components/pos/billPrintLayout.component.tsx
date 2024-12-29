import { useRef } from "react";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/types/redux.type";
import { Button } from "../ui/button";
import { format } from "date-fns";



export function BillPrintLayout() {

  const printRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const paymentSucces = useSelector(
    (state: RootState) => state.pos.isPaymentSuccess
  );

  const paymentOrders = useSelector(
    (state: RootState) => state.pos.billOrderData
  );
  const totalAmount = 600;
  const grandTotal = totalAmount + 100;
  const tax = grandTotal * 0.18;

  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    }
  };


  return (
    <Dialog open={paymentSucces} onOpenChange={() => { dispatch({ type: "pos/setIsPaymentSuccess", payload: false }) }}>
      <DialogContent>
        <div
          ref={printRef}
          className=" print:block p-4 max-w-[80mm] mx-auto text-[10px] leading-tight"
        >
          <div className="text-center mb-4">
            <h1 className="font-bold text-[12px] mb-1">{paymentOrders?.restaurant?.restaurantName}</h1>

            <div>{paymentOrders?.restaurant?.address}</div>
            <div>{paymentOrders?.restaurant?.phoneNumber}</div>
            <p className="text-xs">{paymentOrders?.orderNumber}</p>

          </div>

          <div className="flex justify-between mb-2 text-[9px]">
            <div>
              Type: {paymentOrders?.orderType}
              <br />

            </div>
            <div>
              Date: {paymentOrders && format(paymentOrders?.createdAt, "dd/MM/yyyy")}
              <br />
              Pay Type: {paymentOrders?.paymentMethod}
            </div>
          </div>

          <table className="w-full mb-2">
            <thead>
              <tr className="border-y border-black">
                <th className="text-left py-1">Item Name</th>
                <th className="text-center">Qty</th>
                <th className="text-right">Rate</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {paymentOrders?.orderItems?.map((item:any) => (
                <tr key={item.id}>
                  <td className="text-left py-1">{item.name}</td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-right">{item.price}</td>
                  <td className="text-right">
                    {(parseInt(item.price) * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border-t border-black border-dashed pt-1">
            <div className="flex justify-between">
              <span>Sub Total:</span>
              <span>{totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Service Charge (18%):</span>
              <span>{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (18%):</span>
              <span>{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold border-t border-black mt-1 pt-1">
              <span>Grand Total:</span>
              <span>{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="text-center mt-4">THANK YOU FOR VISITING US!</div>
        </div>
        <DialogFooter >
          <Button className="w-full" size={"lg"} onClick={handlePrint}>PrintBill</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
