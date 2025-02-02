import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import useGetInventory from "@/hooks/useGetInventory";

interface ExistingInventoryTableProps {
  onSelectInventory?: (inventoryId: string) => void;
}

const ExistingInventoryTable: React.FC<ExistingInventoryTableProps> = ({ onSelectInventory }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const { inventory } = useGetInventory({ page, limit, search });
  const [selectedInventoryId, setSelectedInventoryId] = useState<string | null>(null);

  const handleInventorySelect = (inventoryId: string) => {
    setSelectedInventoryId(inventoryId);
    onSelectInventory?.(inventoryId);
  };

  return (
    <div className="space-y-4 rounded-lg border p-4 w-full">
      <h1 className="text-sm font-bold">Existing Inventory Table</h1>
      <div className="flex gap-4">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Button type="button">
          Search <Search className="h-4 w-4" />
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Select</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox
                  checked={selectedInventoryId !== null && parseInt(selectedInventoryId) === item.id}
                  onCheckedChange={() => handleInventorySelect(item.id?.toString())}
                />
              </TableCell>
              <TableCell>{item.productName}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>Rs.{item.unitPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {(!inventory || inventory.length === 0) && (
        <p className="text-center text-sm text-gray-500 mt-4">No existing inventory found</p>
      )}
      <div className="flex justify-between">
        <Button type="button" onClick={() => page > 1 && setPage(page - 1)}>
          Previous Page
        </Button>
        <Button type="button" onClick={() => setPage(page + 1)}>
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default ExistingInventoryTable;