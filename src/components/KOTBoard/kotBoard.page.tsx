import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Check, Trash2 } from 'lucide-react'
import { socketService } from '@/services/socket/socket.service'
import { format } from 'date-fns'
import { BELL_SOUND } from '@/constant'
import { OrderType } from '@/types/order.type'



export function DigitalKOTBoard() {
    const [orders, setOrders] = useState<OrderType[]>([])
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const socket = socketService.connect();

        if (socket) {
            // Listen for new orders
            socket.on('newOrder', (newOrder) => {
                console.log('New order:', newOrder);
                setOrders(prevOrders => [...prevOrders, newOrder?.data as OrderType]);
                // Play notification sound
                if (audioRef.current) {
                    audioRef.current.play().catch(error => {
                        console.error('Error playing sound:', error);
                    });
                }
            });

            // Listen for order updates
            socket.on('order_update', (updatedOrder) => {
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order.id === updatedOrder.id ? updatedOrder : order
                    )
                );
            });

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
                socket.off('newOrder');
                socket.off('order_update');
                socket.off('order_delete');
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


    const OrderCard = ({ order }: { order: OrderType }) => {
        console.log(order);
        return (
            <div className="relative">

                <Card className="bg-white shadow-lg relative overflow-hidden">
                    <CardHeader className="bg-gray-200 pb-2">
                        <CardTitle className="flex justify-between items-center">
                            <span>Order #{order.orderNumber}</span>
                            <Badge variant={order.status === 'new' ? 'destructive' : order.status === 'preparing' ? 'warning' : 'success'}>
                                {order.status.toUpperCase()}
                            </Badge>
                        </CardTitle>
                        <div className="text-sm text-gray-500">
                            {format(order.createdAt, 'dd/MM/yyyy')}
                        </div>
                    </CardHeader>
                    <CardContent>

                        <ul className="space-y-2">
                            {order?.orderItems?.map((item) => (
                                <li key={item.id} className="flex items-center justify-between border-b pb-2">
                                    <div className="flex items-center space-x-3">
                                        <div className="relative w-6 h-6">
                                            <Checkbox
                                                checked={item.isComplete}
                                                onCheckedChange={() => toggleItemCompletion(order.id, item.id)}
                                                id={`item-${item.id}`}
                                                className="w-6 h-6 border-2 rounded-md"
                                            />
                                            {item.completed && (
                                                <Check className="absolute top-0 left-0 w-6 h-6 text-primary pointer-events-none" />
                                            )}
                                        </div>
                                        <label
                                            htmlFor={`item-${item.id}`}
                                            className={`font-semibold text-lg ${item.completed ? 'line-through text-gray-500' : ''}`}
                                        >
                                            {item.product.name}
                                        </label>
                                    </div>
                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-lg">x{item.quantity}</span>
                                </li>
                            ))}
                        </ul>


                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <audio ref={audioRef} src={BELL_SOUND} />

            <h1 className="text-3xl font-bold mb-4">Kitchen Order Board</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {orders?.map((order) => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </div>
        </div>
    )
}