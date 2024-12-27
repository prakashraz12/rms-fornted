import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, ShoppingCart, XCircle } from "lucide-react";
import useGetOrders from "@/hooks/useGetOrders";
import {
  setPosSelectionType,
  setSelectedOrders,
} from "@/features/pos/posSlice";
import { useDispatch } from "react-redux";
import { OrderType } from "@/types/order.type";
import { format } from "date-fns";
import { POS_SELECTION_TYPE } from "@/enums/posSelectionType.enum";
import { OrderType as ORDER_TYPE } from "@/enums/orderType.enum";
import NoOrdersToday from "./noOrdersToday";

const OrderCard: React.FC<{
  order: OrderType;
  handleLoadToPos: (order: OrderType) => void;
}> = ({ order, handleLoadToPos }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-white p-4 rounded-lg shadow-md mb-4"
  >
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-md font-semibold">{order.orderNumber}</h3>
      <p>{`${order?.orderType} -  (${order?.orderType === ORDER_TYPE.DINE_IN && order?.tables?.map((table) => table.name).join(", ")})`}</p>
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
    <p className="text-sm text-gray-600 mb-2">
      {format(order.createdAt, "dd/MM/yyyy")}
    </p>
    <ul className="list-disc list-inside mb-2">
      {order.orderItems?.map((item, index) => (
        <li key={index} className="text-sm">
          {item?.name} ({item?.quantity}X)
        </li>
      ))}
    </ul>
    <Button onClick={() => handleLoadToPos(order)}>Load Pos</Button>
  </motion.div>
);

export function OrderStatusDialog() {
  const { orders } = useGetOrders();
  const dispatch = useDispatch();

  console.log(orders);

  const handleLoadToPos = (order: OrderType) => {
    dispatch(setPosSelectionType(POS_SELECTION_TYPE.EXISTING));
    dispatch(setSelectedOrders(order));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-10 px-4 bg-green-500 hover:bg-green-600 text-white">
          <ShoppingCart className="h-5 w-5 mr-2" />
          Orders
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-11/12 h-[80vh]">
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
                  .map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      handleLoadToPos={handleLoadToPos}
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
                  ?.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      handleLoadToPos={handleLoadToPos}
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
