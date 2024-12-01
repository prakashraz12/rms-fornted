import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Waiter {
  id: number;
  name: string;
  ordersCount: number;
  totalSales: number;
}

const initialWaiters: Waiter[] = [
  { id: 1, name: "Alice Johnson", ordersCount: 45, totalSales: 1350.75 },
  { id: 2, name: "Bob Smith", ordersCount: 38, totalSales: 1140.5 },
  { id: 3, name: "Charlie Brown", ordersCount: 52, totalSales: 1560.25 },
  { id: 4, name: "Diana Miller", ordersCount: 41, totalSales: 1230.0 },
  { id: 5, name: "Ethan Davis", ordersCount: 49, totalSales: 1470.75 },
];

export function WaiterAnalysisCard() {
  const [waiters, setWaiters] = useState<Waiter[]>(initialWaiters);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const sortWaiters = () => {
    const sorted = [...waiters].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.ordersCount - b.ordersCount;
      } else {
        return b.ordersCount - a.ordersCount;
      }
    });
    setWaiters(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Waiter Analysis
          <Button variant="ghost" onClick={sortWaiters}>
            Sort by Orders
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Orders</TableHead>
              <TableHead className="text-right">Total Sales</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {waiters.map((waiter) => (
              <TableRow key={waiter.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src={
                        "https://res.cloudinary.com/du1bbws62/image/upload/v1730550215/w7ngq8lat8ytfoy69dkz.jpg"
                      }
                      alt={waiter.name}
                    />
                    <AvatarFallback>
                      {waiter.name
                        .split(" ")
                        .map((name) => name[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <p>{waiter.name}</p>
                </TableCell>
                <TableCell className="text-right">
                  {waiter.ordersCount}
                </TableCell>
                <TableCell className="text-right">
                  ${waiter.totalSales.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
