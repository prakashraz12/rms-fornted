import React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Printer } from "lucide-react";

interface OrderItem {
  name: string;
  quantity: number;
  remarks?: string;
}

interface KOTProps {
  orderNumber: string;
  orderType: string;
  items: OrderItem[];
  date: Date;
  tableNumber?: string;
}

export const KitchenOrderTicket: React.FC<KOTProps> = ({
  orderNumber,
  orderType,
  items,
  date,
  tableNumber,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          Kitchen Order Ticket
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span>Order #: {orderNumber}</span>
          <span>{format(date, "dd/MM/yyyy HH:mm")}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Type: {orderType}</span>
          {tableNumber && <span>Table: {tableNumber}</span>}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">Item</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead className="w-[30%]">Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell>{item.remarks || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-end print:hidden">
        <Button onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Print KOT
        </Button>
      </CardFooter>
    </Card>
  );
};
