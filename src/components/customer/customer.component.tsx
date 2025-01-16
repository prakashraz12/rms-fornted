import { useState } from "react";
import { Button } from "@/components/ui/button";
import useGetMineCoustomer from "@/hooks/useGetCustomer";
import { DatePickerWithRange } from "../ui/date-range-picker";
import { Input } from "../ui/input";
import { DateRange } from "react-day-picker";
import { Eye, FileOutput, FileText, Loader2, Search } from "lucide-react";
import { exportSelectedRowsToCSV, exportSelectedRowsToPDF } from "@/lib/utils";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  Table,
  TableRow,
} from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { Skeleton } from "../ui/skeleton";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const customer_columns = [
  {
    id: "name",
    label: "Customer Name",
  },
  {
    id: "address",
    label: "Address",
  },
  {
    id: "phone",
    label: "Phone",
  },
  {
    id: "createdAt",
    label: "Created At",
  },
];

export function CustomerTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const { data, isFetching, isLoading, getMineCoustomerQuery } =
    useGetMineCoustomer({
      customerName,
      address,
      phone,
      sortBy: "",
      startDate: date?.from?.toISOString(),
      endDate: date?.to?.toISOString(),
      page,
      limit,
    });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(data?.data?.data?.map((bill: any) => bill.id));
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
    setCustomerName("");
    setAddress("");
    setPhone("");
    setDate({ from: undefined, to: undefined });
  };

  return (
    <div className="container mx-auto mt-6">
      <h2 className="text-2xl font-semibold">Customers.</h2>
      <p className="text-sm">Here you can manage your customers.</p>
      <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-6 mb-4 mt-5">
        <div className="flex flex-col lg:flex-1">
          <p className="text-sm mb-1 ml-2">Customer Name</p>
          <Input
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full lg:max-w-sm"
          />
        </div>
        <div className="flex flex-col lg:flex-1">
          <p className="text-sm mb-1 ml-2">Phone</p>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full lg:max-w-sm"
          />
        </div>
        <div className="flex flex-col lg:flex-1">
          <p className="text-sm mb-1 ml-2">Address</p>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full lg:max-w-sm"
          />
        </div>
        <div className="flex flex-col lg:flex-1">
          <p className="text-sm mb-1 ml-2">Date Range Filter</p>
          <DatePickerWithRange date={date} setDate={setDate} />
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-2">
          <Button
            variant="destructive"
            onClick={clearFilters}
            className="mb-2 lg:mb-0 mt-6"
          >
            Clear
          </Button>
          <Button
            onClick={getMineCoustomerQuery}
            disabled={isLoading || isFetching}
            className="mb-2 lg:mb-0 mt-6"
          >
            {isLoading || isFetching ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Search />
            )}{" "}
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
                  customer_columns,
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
                  checked={selectedItems?.length === data?.data?.data?.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Customer Phone</TableHead>
              <TableHead>Customer Address</TableHead>
              <TableHead>Due Amount</TableHead>
              <TableHead>Credit Amount</TableHead>
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
            {data?.data?.data?.map((customer: any) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(customer.id)}
                    onCheckedChange={(checked) =>
                      handleSelectItem(checked as boolean, customer.id)
                    }
                  />
                </TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.phone || "N/A"}</TableCell>
                <TableCell>{customer.address || "N/A"}</TableCell>
                <TableCell>{customer?.dueBalance || "N/A"}</TableCell>
                <TableCell>{customer?.creditBalance || "N/A"}</TableCell>
                <TableCell>
                  {format(new Date(customer.createdAt), "PP")}
                </TableCell>
                <TableCell>
                  {format(new Date(customer.updatedAt), "PP")}
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button variant={"outline"}>
                    <Eye />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="space-x-2">
            {data?.data?.meta?.page !== 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
            )}
            {data?.data?.meta?.page < data?.data?.meta?.totalPages && (
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
            <p className="text-sm">{`Showing result of ${data?.data?.meta?.page} page of ${data?.data?.meta?.totalPages}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
