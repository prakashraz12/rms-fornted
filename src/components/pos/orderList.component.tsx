"use client";

import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export default function OrderTable() {
  const [items, setItems] = useState<OrderItem[]>([
    { id: "1", name: "Ana Marina", quantity: 1, price: 55 },
    { id: "2", name: "American Space Coffee", quantity: 1, price: 45 },
    { id: "3", name: "Sushi", quantity: 1, price: 45 },
    { id: "4", name: "Spicy Chicken Burger", quantity: 1, price: 65 },
    { id: "5", name: "Cheesy Cheesecake", quantity: 1, price: 3.75 },
    { id: "6", name: "Cheezy Sourdough", quantity: 1, price: 4.5 },
    { id: "7", name: "Egg Tart", quantity: 1, price: 3.25 },
    { id: "8", name: "Grains Pan Bread", quantity: 1, price: 4.5 },
    { id: "9", name: "Cheesy Sourdough", quantity: 1, price: 4.5 },
    { id: "10", name: "Cheesy Sourdough", quantity: 1, price: 4.5 }
  ]);

  const updateQuantity = (id: string, increment: boolean) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;
          return {
            ...item,
            quantity: Math.max(1, newQuantity), // Prevent going below 1
          };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal;

  return (
    <>
      <div className="flex-grow overflow-auto h-[calc(100vh-26rem)]">
        <Table>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium w-1/2">{item.name}</TableCell>
                <TableCell className="w-1/4">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-xl shadow-md"
                      onClick={() => updateQuantity(item.id, false)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-xl shadow-md"
                      onClick={() => updateQuantity(item.id, true)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-right w-1/10">
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell className="w-1/8">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-10 w-10 rounded-xl"
                    onClick={() => removeItem(item.id)}
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
