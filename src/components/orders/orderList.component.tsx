import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Input } from "../ui/input";
import { DatePickerWithRange } from "../ui/date-range-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useLazyGetOrderByRestaurantIdQuery } from "@/services/api/order.api";
import {
  Calculator,
  Eye,
  FileOutput,
  FileText,
  Loader2,
  Search,
} from "lucide-react";
import { exportSelectedRowsToCSV, exportSelectedRowsToPDF } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import { OrderResponse } from "@/types/order.type";
import { OrderDialog } from "./orderViewDialog";
import KOTLayoutPopUp from "./kotPopUp.component";

const order_columns = [
  {
    id: "orderNumber",
    label: "Order Number",
  },
  {
    id: "orderType",
    label: "Order Type",
  },
  {
    id: "orderAmount",
    label: "Order Amount",
  },
  {
    id: "createdAt",
    label: "Date",
  },
  {
    id: "status",
    label: "Status",
  },
];

const OrderList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const [orderNumber, setOrderNumber] = useState<string>("");
  const [minOrderAmount, setMinOrderAmount] = useState<string>("");
  const [maxOrderAmount, setMaxOrderAmount] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("DESC");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [orderStatus, setOrderStatus] = useState<string>("");
  const [orderType, setOrderType] = useState<string>("");

  const [getOrders, { isLoading, data, isFetching }] =
    useLazyGetOrderByRestaurantIdQuery();

  const fetchorders = async () => {
    await getOrders({
      page,
      limit,
      orderNumber,
      startDate: date?.from?.toISOString(),
      endDate: date?.to?.toISOString(),
      minOrderAmount,
      maxOrderAmount,
      sortBy,
      status: orderStatus,
      orderType: orderType,
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(
        data?.data?.orders?.map((order: OrderResponse) => order.id)
      );
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (checked: boolean, id: number) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    }
  };

  const clearFilters = () => {
    setOrderNumber("");
    setDate({ from: undefined, to: undefined });
    setMinOrderAmount("");
    setMaxOrderAmount("");
    setOrderStatus("");
    setOrderType("");
    setSelectedItems([]);
    setSortBy("DESC");
  };

  useEffect(() => {
    fetchorders();
  }, [page, limit]);

  return (
    <div className="container mx-auto  mt-6 w-full h-full">
      <h2 className="text-2xl font-semibold">Orders</h2>
      <p className="text-sm">Here you can manage your orders</p>
      <div className="space-y-4 mt-4">
        {/* Form Container */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {/* Order Number */}
          <div className="space-y-1">
            <p className="text-sm font-medium ml-2">Order Number</p>
            <Input
              placeholder="ORD-000000"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Date Range */}
          <div className="space-y-1 sm:col-span-2 lg:col-span-3 xl:col-span-2">
            <p className="text-sm font-medium ml-2">Date Range Filter</p>
            <DatePickerWithRange
              date={date}
              setDate={setDate}
              className="w-full"
            />
          </div>

          {/* Order Amount */}
          <div className="space-y-1 sm:col-span-2 lg:col-span-3 xl:col-span-2">
            <p className="text-sm font-medium ml-2">Order Amount</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Min total"
                value={minOrderAmount}
                onChange={(e) => setMinOrderAmount(e.target.value)}
                className="w-full"
              />
              <Input
                placeholder="Max total"
                value={maxOrderAmount}
                onChange={(e) => setMaxOrderAmount(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Order Status */}
          <div className="space-y-1">
            <p className="text-sm font-medium ml-2">Order Status</p>
            <Select value={orderStatus} onValueChange={setOrderStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Order Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="complete">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Order Type */}
          <div className="space-y-1">
            <p className="text-sm font-medium ml-2">Order Type</p>
            <Select value={orderType} onValueChange={setOrderType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Order Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DINE_IN">Dine In</SelectItem>
                <SelectItem value="TAKE_AWAY">Take Away</SelectItem>
                <SelectItem value="DELIVERY">Delivery</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort By */}
          <div className="space-y-1">
            <p className="text-sm font-medium ml-2">Sort By</p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ASC">Ascending</SelectItem>
                <SelectItem value="DESC">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            variant="destructive"
            onClick={clearFilters}
            className="w-full sm:w-auto"
          >
            Clear
          </Button>
          <Button
            onClick={fetchorders}
            disabled={isLoading || isFetching}
            className="w-full sm:w-auto"
          >
            {isLoading || isFetching ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Search className="mr-2 h-4 w-4" />
            )}
            Search
          </Button>
        </div>
      </div>

      <div className="border rounded-xl p-4 mt-4">
        {selectedItems?.length > 0 && (
          <div className="flex justify-end space-x-2">
            <Button
              onClick={() =>
                exportSelectedRowsToCSV(data?.data?.data, selectedItems)
              }
            >
              Export to CSV <FileOutput />
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                exportSelectedRowsToPDF(
                  data?.data?.data,
                  order_columns,
                  selectedItems
                )
              }
            >
              Export to PDF <FileText />
            </Button>
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedItems.length === data?.data?.orders?.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Order Number</TableHead>
              <TableHead>Order Items</TableHead>
              <TableHead>Order Type</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading &&
              Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox disabled />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20 rounded-full bg-emerald-100" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-16 rounded-full bg-red-100" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-24" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8 rounded-md bg-emerald-100" />
                      <Skeleton className="h-8 w-8 rounded-md" />
                      <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            {data?.data?.orders?.map((order: OrderResponse) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(order.id)}
                    onCheckedChange={(checked) =>
                      handleSelectItem(checked as boolean, order.id)
                    }
                  />
                </TableCell>
                <TableCell>{order.orderNumber}</TableCell>
                <TableCell>{order.totalItems || "N/A"}</TableCell>
                <TableCell>
                  <Badge>{order.orderType}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={order.status === "pending" ? "outline" : "success"}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.totalAmount}</TableCell>
                <TableCell>{format(new Date(order.createdAt), "PP")}</TableCell>
                <TableCell>{format(new Date(order.updatedAt), "PP")}</TableCell>
                <TableCell className="flex gap-2">
                  <KOTLayoutPopUp order={order} />
                  <Button variant={"outline"}>
                    <Calculator />
                    Load POS
                  </Button>
                  <OrderDialog
                    order={order}
                    trigger={
                      <Button size={"icon"} variant={"outline"}>
                        <Eye />
                      </Button>
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="space-x-2">
            {data?.data?.metadata?.page !== 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
            )}
            {data?.data?.metadata?.page < data?.data?.metadata?.totalPages && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={limit?.toString()}
              onValueChange={(value) => setLimit(Number(value))}
            >
              <SelectTrigger className="w-22">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm">{`Showing result of ${data?.data?.metadata?.page} page of ${data?.data?.metadata?.totalPages}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
