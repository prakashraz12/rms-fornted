import * as React from "react";
import { Plus, FileOutput, Loader2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useLazyGetInventoryListQuery } from "@/services/api/inventoryApi";
import { Input } from "../ui/input";
import { DatePickerWithRange } from "../ui/date-range-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { exportSelectedRowsToCSV } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import { InventoryItems } from "@/types/inventory.type";
import { DateRange } from "react-day-picker";

// type FormValues = z.infer<typeof inventorySchema>;

export default function InventoryManagement() {
  const [isAddInventoryDialogOpen, setIsAddInventoryDialogOpen] =
    React.useState(false);
  const [productName, setProductName] = React.useState("");
  const [miniMumStock, setMiniMumStock] = React.useState("");
  const [maximumStock, setMaximumStock] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [selectedItems, setSelectedItems] = React.useState<number[]>([]);
  const [trigger, { data, isLoading, isFetching }] =
    useLazyGetInventoryListQuery();

  const getInventoryList = React.useCallback(async () => {
    await trigger({
      page,
      limit,
      status,
      miniMumStock,
      maximumStock,
      productName,
      startDate: date?.from?.toISOString(),
      endDate: date?.to?.toISOString(),
    });
  }, [
    trigger,
    page,
    limit,
    status,
    miniMumStock,
    maximumStock,
    productName,
    date,
  ]);

  React.useEffect(() => {
    getInventoryList();
  }, [page, limit]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(
        data?.data?.inventory?.map((inventory: InventoryItems) => inventory.id)
      );
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (checked: boolean, id: number) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, id]);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleClearFilters = () => {
    setDate({
      from: undefined,
      to: undefined,
    });
    setProductName("");
    setMiniMumStock("");
    setMaximumStock("");
    setStatus("");
    setSelectedItems([]);
  };

  console.log(isAddInventoryDialogOpen);
  return (
    <div className="container mx-auto  mt-6 w-full h-full">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Inventory Management</h2>
          <p className="text-sm">Here you can manage your inventory</p>
        </div>
        <div>
          <Button onClick={() => setIsAddInventoryDialogOpen(true)}>
            <Plus /> Add New Inventory
          </Button>
        </div>
      </div>
      <div className="space-y-4 mt-6">
        {/* Form Container */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {/* Order Number */}
          <div className="space-y-1">
            <p className="text-sm font-medium ml-2">Product Name</p>
            <Input
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
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
            <p className="text-sm font-medium ml-2">Stock Level</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Minimum Stock Level"
                value={miniMumStock}
                onChange={(e) => setMiniMumStock(e.target.value)}
                className="w-full"
              />
              <Input
                placeholder="Maximum Stock Level"
                value={maximumStock}
                onChange={(e) => setMaximumStock(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            variant="destructive"
            onClick={handleClearFilters}
            className="w-full sm:w-auto"
          >
            Clear
          </Button>
          <Button
            onClick={getInventoryList}
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
            {/* <Button
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
            </Button> */}
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={
                    selectedItems.length === data?.data?.inventory?.length
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="text-center">ProductName</TableHead>
              <TableHead className="text-center">Unit Price</TableHead>
              <TableHead className="text-center">Last Updated</TableHead>
              <TableHead className="text-center">Minimum Stock Level</TableHead>
              <TableHead className="text-center">Current Quantity</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Measuring Unit</TableHead>
              <TableHead className="text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading &&
              Array.from({ length: 8 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox disabled />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-[120px]" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-[80px]" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-[80px]" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-[80px]" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-6 w-[80px] rounded-full" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-[40px]" />
                  </TableCell>
                </TableRow>
              ))}
            {data?.data?.inventory?.map((inventory: InventoryItems) => (
              <TableRow key={inventory.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(inventory.id)}
                    onCheckedChange={(checked) =>
                      handleSelectItem(checked as boolean, inventory.id)
                    }
                  />
                </TableCell>
                <TableCell className="text-center">
                  {inventory?.productName}
                </TableCell>
                <TableCell className="text-center">
                  Rs.{inventory?.unitPrice || "N/A"}
                </TableCell>
                <TableCell className="text-center">
                  {format(new Date(inventory?.lastUpdated), "PP")}
                </TableCell>
                <TableCell className="text-center">
                  {inventory?.minimumStockLevel} {inventory?.measuringUnit}
                </TableCell>
                <TableCell className="text-center">
                  {inventory?.quantity} {inventory?.measuringUnit}
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={
                      inventory?.quantity <= inventory?.minimumStockLevel
                        ? "destructive"
                        : "default"
                    }
                  >
                    {inventory?.quantity <= inventory?.minimumStockLevel
                      ? "Low Stock"
                      : "In Stock"}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  {inventory?.measuringUnit}
                </TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="space-x-2">
            {data?.data?.metaData?.currentPage !== 1 && (
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
            <p className="text-sm">{`Showing result of ${data?.data?.metaData?.currentPage} page of ${data?.data?.metaData?.totalPages}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
