import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import useGetOrders from "@/hooks/useGetOrders";
import { format } from "date-fns";

const RecentOrders = () => {
  const { orders } = useGetOrders(5);
  return (
    <motion.div
      className="lg:col-span-2 "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            Latest customer orders and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Number</TableHead>
                <TableHead>Total Items</TableHead>
                <TableHead>Order Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.slice(0, 5)?.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.orderNumber}</TableCell>
                  <TableCell>{order.totalItems}</TableCell>
                  <TableCell>{order.orderType}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "Completed"
                          ? "success"
                          : order.status === "Pending"
                            ? "warning"
                            : "default"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(order?.createdAt), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                        <DropdownMenuItem>Print Receipt</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecentOrders;
