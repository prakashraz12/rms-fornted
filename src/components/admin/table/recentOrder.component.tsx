import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown, FilterIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import BorderRadiusWrapper from "@/components/common/borderRadiusWrapper.component";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";

interface Order {
  id: string;
  type: "Dine-in" | "Takeaway" | "Delivery";
  totalItems: number;
  status: "Pending" | "Completed" | "Cancelled";
  tableNo?: number;
  total: number;
}

const orders: Order[] = [
  {
    id: "ORD001",
    type: "Dine-in",
    totalItems: 3,
    status: "Pending",
    tableNo: 5,
    total: 45.99,
  },
  {
    id: "ORD002",
    type: "Takeaway",
    totalItems: 2,
    status: "Completed",
    total: 25.5,
  },
  {
    id: "ORD003",
    type: "Delivery",
    totalItems: 4,
    status: "Pending",
    total: 60.75,
  },
  {
    id: "ORD004",
    type: "Dine-in",
    totalItems: 1,
    status: "Cancelled",
    tableNo: 3,
    total: 15.99,
  },
  {
    id: "ORD005",
    type: "Takeaway",
    totalItems: 3,
    status: "Completed",
    total: 35.25,
  },
];

const RecentOrdersTable: React.FC = () => {
  return (
    <BorderRadiusWrapper class="shadow-sm">
      <h1 className="text-2xl font-bold"> Orders</h1>
      <p className="text-sm text-muted-foreground">Recent Orders</p>
      <div className="flex items-center gap-2 mt-3">
        <Input type="text" placeholder="Search" className="w-1/2" />
        <div className="w-auto">
          <Select>
            <SelectTrigger>
                          <FilterIcon className="w-4 h-4" />
                          <p>Filter</p>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Total Items</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Table No.</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.type}</TableCell>
              <TableCell>{order.totalItems}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    order.status === "Completed"
                      ? "secondary"
                      : order.status === "Pending"
                        ? "default"
                        : "destructive"
                  }
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>{order.tableNo || "N/A"}</TableCell>
              <TableCell className="text-right">
                ${order.total.toFixed(2)}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Update status</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Cancel order</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BorderRadiusWrapper>
  );
};

export default RecentOrdersTable;
