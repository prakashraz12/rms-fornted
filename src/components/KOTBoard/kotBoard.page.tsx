import { useState, useRef, useEffect } from "react";
import { socketService } from "@/services/socket/socket.service";
import { BELL_SOUND } from "@/constant";
import { OrderType } from "@/enums/orderType.enum";

export function DigitalKOTBoard() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  console.log(orders);
  useEffect(() => {
    const socket = socketService.connect();

    if (socket) {
      // Listen for new orders
      socket.on("newOrder", (newOrder) => {
        console.log("New order:", newOrder);
        setOrders((prevOrders) => [...prevOrders, newOrder?.data as OrderType]);
        // Play notification sound
        if (audioRef.current) {
          audioRef.current.play().catch((error) => {
            console.error("Error playing sound:", error);
          });
        }
      });

      // Listen for order updates
      // socket.on("order_update", (updatedOrder) => {
      //   setOrders((prevOrders) =>
      //     prevOrders.map((order) =>
      //       order.id === updatedOrder.id ? updatedOrder : order
      //     )
      //   );
      // });

      // // Listen for order deletions
      // socket.on('order_delete', (orderId: string) => {
      //     setOrders(prevOrders =>
      //         prevOrders.filter(order => order.id !== orderId)
      //     );
      // });
    }

    // Cleanup on component unmount
    return () => {
      if (socket) {
        socket.off("newOrder");
        socket.off("order_update");
        socket.off("order_delete");
      }
    };
  }, []);

  // const toggleItemCompletion = (orderId: string, itemId: string) => {
  //     setOrders(orders.map(order => {
  //         if (order.id === orderId) {
  //             const updatedItems = order.items.map(item =>
  //                 item.id === itemId ? { ...item, completed: !item.completed } : item
  //             )
  //             return { ...order, items: updatedItems }
  //         }
  //         return order
  //     }))
  // }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <audio ref={audioRef} src={BELL_SOUND} />

      <h1 className="text-3xl font-bold mb-4">Kitchen Order Board</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* {orders?.map((order: OrderResponse) => (
          <OrderCard key={order.id} order={order} />
        ))} */}
      </div>
    </div>
  );
}
