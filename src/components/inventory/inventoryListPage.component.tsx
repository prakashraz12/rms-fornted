import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Package, Plus, Edit, Trash2, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddInventoryDialog from "./inventoryAddForm";
import { useLazyGetInventoryListQuery } from "@/services/api/inventoryApi";

const inventorySchema = z.object({
  name: z.string().min(2, "Inventory name must be at least 2 characters"),
  currentStock: z
    .number()
    .min(0, "Current stock must be a non-negative number"),
  minimumStock: z
    .number()
    .min(0, "Minimum stock must be a non-negative number"),
  skuId: z.string().min(1, "SKU code is required"),
  unitPrice: z
    .number()
    .min(0, "Unit price must be a non-negative number"),
});

type FormValues = z.infer<typeof inventorySchema>;

interface InventoryItem extends FormValues {
  id: string;
  lastUpdated: Date;
}

export default function InventoryManagement() {
  const [trigger, {data}] = useLazyGetInventoryListQuery();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [inventoryItems, setInventoryItems] = React.useState<InventoryItem[]>(
    []
  );


  const getInventoryList = React.useCallback(async() => {
    await trigger({});
  }, [trigger]);


  React.useEffect(() => {
    getInventoryList();
  }, [getInventoryList]);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      name: "",
      currentStock: 0,
      minimumStock: 0,
      skuId: "",
      unitPrice: 0,
    },
  });

  const onSubmit = async (data: FormValues) => {
    const newItem: InventoryItem = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      lastUpdated: new Date(),
    };
    setInventoryItems([...inventoryItems, newItem]);
    setIsDialogOpen(false);
    form.reset();
  };

  
  console.log(data);
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Package className="w-6 h-6" />
              Inventory Management
            </span>
          </CardTitle>
          <CardDescription>Manage your inventory items</CardDescription>
          <AddInventoryDialog 
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            form={form}
            onSubmit={onSubmit}
          />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Minimum Stock</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.currentStock}</TableCell>
                  <TableCell>{item.minimumStock}</TableCell>
                  <TableCell>{item.lastUpdated.toLocaleString()}</TableCell>
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
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
