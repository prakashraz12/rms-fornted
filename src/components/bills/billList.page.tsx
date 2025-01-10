import { useLazyGetBillQuery } from "@/services/api/billApi";
import { useCallback, useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { format } from "date-fns";
import { Eye, FileOutput, FileText, Loader2, Pen, Printer, Search } from "lucide-react";
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { DatePickerWithRange } from "../ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { exportSelectedRowsToCSV, exportSelectedRowsToPDF } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

export const Bill_columns = [
    {
        id: "billNumber",
        label: "Bill Number",
    },
    {
        id: "issuedBy",
        label: "Issued By",
    },
    {
        id: "grandTotal",
        label: "Grand Total",
    },
    {
        id: "totalAmount",
        label: "Total Amount",
    },
    {
        id: "discount",
        label: "Discount",
    },
    {
        id: "serviceCharges",
        label: "Service Charges",
    },
    {
        id: "status",
        label: "Status",
    },
    {
        id: "createdAt",
        label: "Created At",
    },
];

const BillListPage = () => {
    const [date, setDate] = useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    });
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState(10);
    const [billNumber, setBillNumber] = useState<string>("");
    const [minGrandTotal, setMinGrandTotal] = useState<string>("");
    const [maxGrandTotal, setMaxGrandTotal] = useState<string>("");
    const [sortBy, setSortBy] = useState<string>("DESC");

    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const [getBills, { isLoading, isFetching, data }] = useLazyGetBillQuery();

    const fetchBills = useCallback(async () => {
        await getBills({
            page,
            limit,
            billNumber,
            startDate: date?.from?.toISOString(),
            endDate: date?.to?.toISOString(),
            minGrandTotal,
            maxGrandTotal,
            sortBy
        });
    }, [page, limit, date?.from, date?.to, billNumber, minGrandTotal, maxGrandTotal, sortBy]);


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
        setDate({ from: undefined, to: undefined });
        setBillNumber("");
        setMinGrandTotal("");
        setMaxGrandTotal("");
    };

    useEffect(() => {
        fetchBills();
    }, [page, limit]);


    return (
        <div className="mx-auto container mt-8">
            <h2 className="text-2xl font-semibold">Bills</h2>
            <p className="text-sm">Here you can manage your bills</p>
            <div className="flex space-x-6 mb-4  mt-5">
                <div>
                    <p className="text-sm mb-1 ml-2"> Bill Number</p>
                    <Input
                        placeholder="BILL-000000"
                        value={billNumber}
                        onChange={(e) => setBillNumber(e.target.value)}
                        className="max-w-sm"
                    />
                </div>
                <div>
                    <p className="text-sm mb-1 ml-2"> Date Range Filter</p>
                    <DatePickerWithRange date={date} setDate={setDate} />
                </div>
                <div>
                    <p className="text-sm mb-1 ml-2"> Grand Total</p>
                    <div className="flex space-x-2">
                        <Input
                            placeholder="Min total"
                            value={minGrandTotal}
                            onChange={(e) => setMinGrandTotal(e.target.value)}
                            className="max-w-sm"
                        />
                        <Input
                            placeholder="Max total"
                            value={maxGrandTotal}
                            onChange={(e) => setMaxGrandTotal(e.target.value)}
                            className="max-w-sm"
                        />
                    </div>
                </div>
                <div>
                    <p className="text-sm mb-1 ml-2">Sort By</p>
                    <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
                        <SelectTrigger className="w-auto">
                            <SelectValue placeholder="Sort" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ASC">Ascending</SelectItem>
                            <SelectItem value="DESC">Descending</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="mt-6 flex space-x-2">
                    <Button variant={"destructive"} onClick={clearFilters}>
                        Clear
                    </Button>
                    <Button onClick={fetchBills} disabled={isLoading || isFetching}>
                        {isLoading || isFetching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search />} Search
                    </Button>
                </div>
            </div>
            <div className="border rounded-xl p-4">
                {selectedItems?.length > 0 && (
                    <div className="flex justify-end space-x-2">
                        <Button onClick={() => exportSelectedRowsToCSV(data?.data?.data, selectedItems)}>
                            Export to CSV <FileOutput />
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => exportSelectedRowsToPDF(data?.data?.data, Bill_columns, selectedItems)}
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
                                    checked={selectedItems.length === data?.data?.data?.length}
                                    onCheckedChange={handleSelectAll}
                                />
                            </TableHead>
                            <TableHead>Bill Number</TableHead>
                            <TableHead>Issued By</TableHead>
                            <TableHead>Payment Method</TableHead>
                            <TableHead>Bill Status</TableHead>
                            <TableHead>Total Amount</TableHead>
                            <TableHead>Discount</TableHead>
                            <TableHead>Service Charges</TableHead>
                            <TableHead>Grand Total</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Updated At</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            isLoading && (
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
                                ))
                            )
                        }
                        {data?.data?.data?.map((bill) => (
                            <TableRow key={bill.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedItems.includes(bill.id)}
                                        onCheckedChange={(checked) =>
                                            handleSelectItem(checked as boolean, bill.id)
                                        }
                                    />
                                </TableCell>
                                <TableCell>{bill.billNumber}</TableCell>
                                <TableCell>{bill.issuedBy || "N/A"}</TableCell>
                                <TableCell>
                                    <Badge>{bill.paymentMethod}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={"destructive"}>{bill.status}</Badge>
                                </TableCell>
                                <TableCell>{bill.totalAmount}</TableCell>
                                <TableCell>{bill.discount || "N/A"}</TableCell>
                                <TableCell>{bill.serviceCharges}</TableCell>
                                <TableCell>{bill.grandTotal}</TableCell>
                                <TableCell>{format(new Date(bill.createdAt), "PP")}</TableCell>
                                <TableCell>{format(new Date(bill.updatedAt), "PP")}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Button size={"icon"}>
                                        <Printer />
                                    </Button>
                                    <Button size={"icon"} variant={"secondary"}>
                                        <Pen />
                                    </Button>
                                    <Button size={"icon"} variant={"outline"}>
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
                        <p className="text-sm">{`Showing result of ${data?.data?.meta?.currentPage} page of ${data?.data?.meta?.totalPages}`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillListPage;
