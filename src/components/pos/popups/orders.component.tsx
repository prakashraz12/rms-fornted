import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Monitor, Printer, XCircle } from "lucide-react";
import useGetOrders from "@/hooks/useGetOrders";
import {
  setBillOrderData,
  setIsPaymentSuccess,
  setPosSelectionType,
  setSelectedDeliveryAddress,
  setSelectedOrders,
  setSelectedTableId,
  setSelectOrderType,
} from "@/features/pos/posSlice";
import { useDispatch } from "react-redux";
import { OrderResponse } from "@/types/order.type";
import { POS_SELECTION_TYPE } from "@/enums/posSelectionType.enum";
import { OrderType as ORDER_TYPE } from "@/enums/orderType.enum";
import NoOrdersToday from "../noOrdersToday";
import { Table } from "../../floor/types/floor.types";
import { Checkbox } from "../../ui/checkbox";
import { cn } from "@/lib/utils";
import { timeAgo } from "@/utils/timeAgo";

const OrderCard: React.FC<{
  order: OrderResponse;
  handleLoadToPos: (order: OrderResponse) => void;
  handlePrintBill: (order: OrderResponse) => void;
}> = ({ order, handleLoadToPos, handlePrintBill }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-white p-4 rounded-lg shadow-md mb-4"
  >
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-md font-semibold">{order.orderNumber}</h3>
      <p>{`${order?.orderType} -  (${order?.orderType === ORDER_TYPE.DINE_IN && order?.tables?.map((table: Table) => table.name).join(", ")})`}</p>
      <Badge
        variant={
          order.status === "completed"
            ? "success"
            : order.status === "pending"
              ? "warning"
              : "destructive"
        }
      >
        {order.status}
      </Badge>
    </div>
    <p className="text-sm text-gray-600 mb-2">{timeAgo(order.createdAt)}.</p>
    <ul className="list-disc list-inside mb-2">
      {order?.orderItems?.map((item, index) => (
        <li
          key={index}
          className={cn(
            "text-sm  flex items-center gap-2",
            item?.isComplete && "line-through"
          )}
        >
          <Checkbox /> {item?.name || item?.productName} ({item?.quantity}X)
        </li>
      ))}
    </ul>
    {order.status === "pending" ? (
      <div className="flex justify-end mt-2">
        <Button onClick={() => handleLoadToPos(order)}>
          Load Pos <Monitor />
        </Button>
        <Button variant={"outline"} className="ml-2">
          Print KOT <Printer />
        </Button>
      </div>
    ) : order.status === "complete" ? (
      <div className="flex justify-end mt-2">
        <Button onClick={() => handlePrintBill(order)}>
          Print Bill <Monitor />
        </Button>
      </div>
    ) : null}
  </motion.div>
);

export function OrderStatusDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { orders } = useGetOrders();

  const dispatch = useDispatch();

  const handleLoadToPos = (order: OrderResponse) => {
    dispatch(setPosSelectionType(POS_SELECTION_TYPE.EXISTING));
    dispatch(setSelectedOrders(order));
    dispatch(setSelectOrderType(order.orderType));
    dispatch(setSelectedDeliveryAddress(order.deliveryAddress));
    dispatch(setSelectedTableId(order.tableIds));
    setOpen(false);
  };

  const handlePrintBill = (order: OrderResponse) => {
    dispatch(setBillOrderData(order));
    dispatch(setIsPaymentSuccess(true));
  };

  return (
    <Dialog
      aria-describedby="order-status"
      open={open}
      onOpenChange={() => setOpen(false)}
    >
      <DialogContent
        aria-describedby="order-status"
        className="max-w-4xl w-11/12 h-[80vh]"
      >
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center mb-4">
            Order Status
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-16">
            <TabsTrigger value="pending" className="text-lg">
              <Clock className="w-5 h-5 mr-2" />
              Pending
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-lg">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Completed
            </TabsTrigger>

            <TabsTrigger value="rejected" className="text-lg">
              <XCircle className="w-5 h-5 mr-2" />
              Rejected
            </TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[calc(80vh-12rem)] mt-4 rounded-md border p-4">
            <TabsContent value="completed">
              <AnimatePresence>
                {orders?.filter((order) => order.status === "complete")
                  ?.length === 0 && <NoOrdersToday type="complete" />}
                {orders
                  ?.filter((order) => order.status === "complete")
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      handleLoadToPos={handleLoadToPos}
                      handlePrintBill={handlePrintBill}
                    />
                  ))}
              </AnimatePresence>
            </TabsContent>
            <TabsContent value="pending">
              <AnimatePresence>
                {orders?.filter((order) => order.status === "pending")
                  ?.length === 0 && <NoOrdersToday type="pending" />}
                {orders
                  ?.filter((order) => order.status === "pending")
                  ?.sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      handleLoadToPos={handleLoadToPos}
                      handlePrintBill={handlePrintBill}
                    />
                  ))}
              </AnimatePresence>
            </TabsContent>
            <TabsContent value="rejected">
              <AnimatePresence>
                {orders?.filter((order) => order.status === "rejected")
                  ?.length === 0 && (
                  <div className="h-full flex items-center justify-center">
                    <h2 className="text-xl">
                      No orders have been rejected today!
                    </h2>
                  </div>
                )}
                {orders
                  ?.filter((order) => order.status === "rejected")
                  ?.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      handleLoadToPos={handleLoadToPos}
                      handlePrintBill={handlePrintBill}
                    />
                  ))}
              </AnimatePresence>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
