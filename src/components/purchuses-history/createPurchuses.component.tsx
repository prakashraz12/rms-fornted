import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { useEntryPurchuseMutation } from "@/services/api/purchusesApi";
import useGetInventory from "@/hooks/useGetInventory";
import { cn } from "@/lib/utils";

const categories = [
  "Liquors",
  "Beer",
  "Wine",
  "Soft Drinks",
  "Vegetables",
  "Drynuts",
  "Fruits",
];

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  unit: z.number().min(1, "Unit must be at least 1"),
  unitPrice: z.number().min(0, "Unit price must be non-negative"),
  totalPrice: z.number().min(0, "Total price must be non-negative"),
  isEnableStockManagement: z.boolean(),
  inventoryId: z.number().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function PurchaseCreatePage() {
  const { inventory } = useGetInventory({ page: 1, limit: 10, search: "" });

  const [purchuses] = useEntryPurchuseMutation();
  const [isStockManagementEnabled, setIsStockManagementEnabled] =
    useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      unit: 1,
      unitPrice: 0,
      totalPrice: 0,
      isEnableStockManagement: false,
      inventoryId: undefined,
    },
  });

  const onSubmit = async (data: FormData) => {
    await purchuses({
      name: data.name,
      category: data.category,
      unit: data.unit,
      totalPrice: data.totalPrice,
      unitPrice: data.unitPrice,
      isEnableStockManagement: data.isEnableStockManagement,
      inventoryId: data.inventoryId,
    });

    toast({
      title: "Purchase created",
      description: "Your purchase has been successfully created.",
    });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-2">Create Purchase</h1>
      <p className="text-sm mb-6">Create a new purchase here.</p>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 border p-6 rounded-xl max-w-2xl"
      >
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...form.register("name")} />
          {form.formState.errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Controller
            name="category"
            control={form.control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {form.formState.errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.category.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="unit">Unit</Label>
          <Input
            id="unit"
            type="number"
            {...form.register("unit", { valueAsNumber: true })}
          />
          {form.formState.errors.unit && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.unit.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="unitprice">Unit Price</Label>
          <Input
            id="unitprice"
            type="number"
            {...form.register("unitPrice", { valueAsNumber: true })}
          />
          {form.formState.errors.unitPrice && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.unitPrice.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="totalPrice">Total Price</Label>
          <Input
            id="totalPrice"
            type="number"
            {...form.register("totalPrice", { valueAsNumber: true })}
          />
          {form.formState.errors.totalPrice && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.totalPrice.message}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="isEnableStockManagement"
            checked={isStockManagementEnabled}
            onCheckedChange={(checked) => {
              setIsStockManagementEnabled(checked);
              form.setValue("isEnableStockManagement", checked);
            }}
          />
          <Label htmlFor="isEnableStockManagement">
            Enable Stock Management
          </Label>
        </div>

        {isStockManagementEnabled && (
          <div>
            <h2 className="text-lg font-semibold mb-2">
              Select Inventory Item
            </h2>
            <p className="text-sm mb-6">
              Select Inventory Item to add to inventory stock.
            </p>
            <div className="rounded-xl border p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead> Current Quantity</TableHead>
                    <TableHead>Minimum Stock Level</TableHead>
                    <TableHead>Measuring Unit</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventory?.map((item) => (
                    <TableRow
                      key={item.id}
                      className={cn(
                        item.id === form.watch("inventoryId") &&
                          "bg-green-600 text-white hover:bg-green-700 "
                      )}
                    >
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>
                        {item.quantity} {item.measuringUnit}
                      </TableCell>
                      <TableCell>
                        {item.minimumStockLevel} {item.measuringUnit}
                      </TableCell>
                      <TableCell>{item.measuringUnit}</TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          className={cn(
                            item.id === form.watch("inventoryId") &&
                              "bg-green-600 text-white hover:bg-green-700 "
                          )}
                          variant="outline"
                          onClick={() => form.setValue("inventoryId", item.id)}
                        >
                          Select
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {form.formState.errors.inventoryId && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.inventoryId.message}
              </p>
            )}
          </div>
        )}

        <Button type="submit" className="mt-4">
          Create Purchase
        </Button>
      </form>
    </div>
  );
}
