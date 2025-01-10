"use client";

import React, { useState, useMemo } from "react";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Customer {
  id: string;
  name: string;
  address: string;
  phone: string;
  creditAmount: number;
}

const data: Customer[] = [
  {
    id: "728ed52f",
    name: "John Smith",
    address: "123 Main St, Anytown, USA",
    phone: "(555) 123-4567",
    creditAmount: 1000,
  },
  {
    id: "489e1d42",
    name: "Jane Doe",
    address: "456 Elm St, Somewhere, USA",
    phone: "(555) 987-6543",
    creditAmount: 2500,
  },
  {
    id: "3ac7d4b1",
    name: "Bob Johnson",
    address: "789 Oak Ave, Elsewhere, USA",
    phone: "(555) 246-8135",
    creditAmount: 1500,
  },
  {
    id: "5ef9c2a8",
    name: "Alice Brown",
    address: "321 Pine Rd, Nowhere, USA",
    phone: "(555) 369-2580",
    creditAmount: 3000,
  },
  {
    id: "1bd7e6f9",
    name: "Charlie Wilson",
    address: "654 Cedar Ln, Anywhere, USA",
    phone: "(555) 741-8520",
    creditAmount: 2000,
  },
];

export function CustomerTable() {
  const [customers, setCustomers] = useState<Customer[]>(data);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState<keyof Customer | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleColumns, setVisibleColumns] = useState<Set<keyof Customer>>(
    new Set(["name", "address", "phone", "creditAmount"])
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const toggleSort = (column: keyof Customer) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const toggleColumnVisibility = (column: keyof Customer) => {
    setVisibleColumns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(column)) {
        newSet.delete(column);
      } else {
        newSet.add(column);
      }
      return newSet;
    });
  };

  const toggleAllCustomers = (checked: boolean) => {
    if (checked) {
      setSelectedCustomers(filteredCustomers.map((c) => c.id));
    } else {
      setSelectedCustomers([]);
    }
  };

  const toggleCustomer = (customerId: string) => {
    setSelectedCustomers((prev) =>
      prev.includes(customerId)
        ? prev.filter((id) => id !== customerId)
        : [...prev, customerId]
    );
  };

  const filteredCustomers = useMemo(() => {
    return customers
      .filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.phone.includes(searchTerm)
      )
      .sort((a, b) => {
        if (!sortColumn) return 0;
        if (a[sortColumn] < b[sortColumn])
          return sortDirection === "asc" ? -1 : 1;
        if (a[sortColumn] > b[sortColumn])
          return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
  }, [customers, searchTerm, sortColumn, sortDirection]);

  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCustomers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCustomers, currentPage]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Customer Table</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center py-4">
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {(Object.keys(data[0]) as Array<keyof Customer>).map((column) => {
                if (column === "id") return null;
                return (
                  <DropdownMenuCheckboxItem
                    key={column}
                    className="capitalize"
                    checked={visibleColumns.has(column)}
                    onCheckedChange={() => toggleColumnVisibility(column)}
                  >
                    {column}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={
                      selectedCustomers.length === filteredCustomers.length
                    }
                    onCheckedChange={toggleAllCustomers}
                  />
                </TableHead>
                {visibleColumns.has("name") && (
                  <TableHead>
                    <Button variant="ghost" onClick={() => toggleSort("name")}>
                      Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                )}
                {visibleColumns.has("address") && (
                  <TableHead>Address</TableHead>
                )}
                {visibleColumns.has("phone") && <TableHead>Phone</TableHead>}
                {visibleColumns.has("creditAmount") && (
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => toggleSort("creditAmount")}
                    >
                      Credit Amount
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                )}
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedCustomers.includes(customer.id)}
                      onCheckedChange={() => toggleCustomer(customer.id)}
                    />
                  </TableCell>
                  {visibleColumns.has("name") && (
                    <TableCell>{customer.name}</TableCell>
                  )}
                  {visibleColumns.has("address") && (
                    <TableCell>{customer.address}</TableCell>
                  )}
                  {visibleColumns.has("phone") && (
                    <TableCell>{customer.phone}</TableCell>
                  )}
                  {visibleColumns.has("creditAmount") && (
                    <TableCell>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(customer.creditAmount)}
                    </TableCell>
                  )}
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
                        <DropdownMenuItem
                          onClick={() =>
                            navigator.clipboard.writeText(customer.id)
                          }
                        >
                          Copy customer ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          View customer details
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit customer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {selectedCustomers.length} of {filteredCustomers.length} row(s)
            selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(
                    prev + 1,
                    Math.ceil(filteredCustomers.length / itemsPerPage)
                  )
                )
              }
              disabled={
                currentPage ===
                Math.ceil(filteredCustomers.length / itemsPerPage)
              }
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
