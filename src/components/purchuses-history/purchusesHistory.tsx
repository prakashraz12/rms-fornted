import { useLazyGetPurchuseQuery } from "@/services/api/purchusesApi";
import { PurchuseReponse } from "@/types/purchuses.type";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { exportSelectedRowsToCSV, exportSelectedRowsToPDF } from "@/lib/utils";
import {
  Edit,
  FileOutput,
  FileText,
  Loader2,
  RefreshCw,
  Search,
} from "lucide-react";
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
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { DatePickerWithRange } from "../ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { PurchaseFormDialog } from "./purchusesFromDialog";

const purchuse_columns = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "category",
    label: "Category",
  },
  {
    id: "unit",
    label: "Unit",
  },
  {
    id: "unitPrice",
    label: "Unit Price",
  },
  {
    id: "totalPrice",
    label: "Total Price",
  },
];

const PurchusesHistory = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [sortBy, setSortBy] = useState("DESC");

  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const [purchuses, setPurchuses] = useState<PurchuseReponse[]>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] =
    useState<PurchuseReponse | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleRepurchase = (purchase: PurchuseReponse) => {
    setSelectedPurchase(purchase);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEdit = (purchase: PurchuseReponse) => {
    setSelectedPurchase(purchase);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedPurchase(null);
    setIsEditing(false);
  };

  const [getPurchuse, { data, isLoading, isFetching }] =
    useLazyGetPurchuseQuery();

  const handleSelectAll = () => {
    if (purchuses) {
      setSelectedItems(purchuses?.map((purchuse) => purchuse.id) || []);
    }
  };

  const handleClearFilters = () => {
    setName("");
    setCategory("");
    setMaxAmount("");
    setMinAmount("");
    setDate({ from: undefined, to: undefined });
    setSortBy("DESC");
  };

  const handleSelectItem = (checked: boolean, id: number) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    }
  };

  const fetchPurchuses = useCallback(async () => {
    const { data } = await getPurchuse({ page, limit });

    if (data) {
      setPurchuses(data?.data?.purchases);
    }
  }, [getPurchuse, page, limit]);

  useEffect(() => {
    fetchPurchuses();
  }, [fetchPurchuses]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold ">Purchuses History</h1>
      <p className="text-sm">Here you can manage your Purchuses History.</p>

      <div className="space-y-4 mt-6">
        {/* Form Container */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {/* Order Number */}
          <div className="space-y-1">
            <p className="text-sm font-medium ml-2">Purchuse Name</p>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
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
                placeholder="Min total price"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                className="w-full"
              />
              <Input
                placeholder="Max total price"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Order Status */}
          <div className="space-y-1">
            <p className="text-sm font-medium ml-2">Category</p>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="complete">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
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
            onClick={handleClearFilters}
            className="w-full sm:w-auto"
          >
            Clear
          </Button>
          <Button
            onClick={fetchPurchuses}
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
                exportSelectedRowsToCSV(data?.data?.purchases, selectedItems)
              }
            >
              Export to CSV <FileOutput />
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                exportSelectedRowsToPDF(
                  data?.data?.purchases,
                  purchuse_columns,
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
                  checked={selectedItems.length === purchuses?.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Particulars</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>totalPrice</TableHead>
              <TableHead>Created At</TableHead>

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
            {purchuses?.map((purchases: PurchuseReponse) => (
              <TableRow key={purchases.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(purchases.id)}
                    onCheckedChange={(checked) =>
                      handleSelectItem(checked as boolean, purchases.id)
                    }
                  />
                </TableCell>
                <TableCell>{purchases.name}</TableCell>
                <TableCell>{purchases.category || "N/A"}</TableCell>
                <TableCell>{purchases.unit || "N/A"}</TableCell>
                <TableCell>Rs.{purchases.unitPrice || "N/A"}</TableCell>
                <TableCell>Rs.{purchases.totalPrice || "N/A"}</TableCell>
                <TableCell>
                  {format(new Date(purchases?.createdAt), "PP")}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRepurchase(purchases)}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Repurchase
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(purchases)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
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
            {data?.data?.metaData?.page < data?.data?.metaData?.totalPages && (
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
      <PurchaseFormDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSubmit={() => {}}
        initialData={selectedPurchase}
        isEditing={isEditing}
      />
    </div>
  );
};

export default PurchusesHistory;
