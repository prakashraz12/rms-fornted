import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Package, Tag, Plus, Edit, Trash2, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Badge } from "../ui/badge";

const categories = [
  "Beverages",
  "Dairy Products",
  "Snacks",
  "Groceries",
  "Personal Care",
  "Home Care",
] as const;

const measurementUnits = [
  { id: "pieces", label: "Pieces", symbol: "pcs" },
  { id: "kilogram", label: "Kilogram", symbol: "kg" },
  { id: "milliliter", label: "Milliliter", symbol: "ml" },
] as const;

const saleOptions = ["Yes", "No"] as const;

const skuSchema = z
  .object({
    name: z.string().min(2, "SKU name must be at least 2 characters"),
    category: z.enum(categories, {
      required_error: "Please select a category",
    }),
    sku: z.string().min(1, "SKU code is required"),
    price: z.string().min(1, "Price is required"),
    minimumOrder: z.string().min(1, "Minimum order is required"),
    unit: z.enum(["pieces", "kilogram", "milliliter"], {
      required_error: "Please select a measurement unit",
    }),
    stockQuantity: z.string().min(1, "Stock quantity is required"),
    description: z.string().optional(),
    onSale: z.enum(saleOptions, {
      required_error: "Please select whether the item is on sale",
    }),
    salePrice: z
      .string()
      .optional()
      .refine(
        (val) => !val || parseFloat(val) > 0,
        "Sale price must be greater than 0"
      ),
  })
  .refine(
    (data) => {
      if (
        data.onSale === "Yes" &&
        (!data.salePrice ||
          parseFloat(data.salePrice) >= parseFloat(data.price))
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Sale price must be less than the regular price",
      path: ["salePrice"],
    }
  );

type FormValues = z.infer<typeof skuSchema>;

interface SKU extends FormValues {
  id: string;
}

export default function SKUManagement() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [skus, setSKUs] = React.useState<SKU[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(skuSchema),
    defaultValues: {
      name: "",
      sku: "",
      price: "",
      minimumOrder: "1",
      stockQuantity: "",
      description: "",
      onSale: "No",
      salePrice: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    const newSKU: SKU = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
    };
    setSKUs([...skus, newSKU]);
    setIsDialogOpen(false);
    form.reset();
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Package className="w-6 h-6" />
              SKU Management
            </span>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add New SKU
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New SKU</DialogTitle>
                  <DialogDescription>
                    Add a new SKU (Stock Keeping Unit) to your inventory
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="minimumOrder"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Order</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" {...field} />
                          </FormControl>
                          <FormDescription>
                            Minimum quantity per order
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="unit"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Measurement Unit</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              {measurementUnits.map((unit) => (
                                <div
                                  key={unit.id}
                                  className="flex items-center space-x-3 space-y-0"
                                >
                                  <RadioGroupItem
                                    value={unit.id}
                                    id={unit.id}
                                  />
                                  <Label htmlFor={unit.id}>
                                    {unit.label} ({unit.symbol})
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full">
                      Create SKU
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </CardTitle>
          <CardDescription>
            Manage your Stock Keeping Units (SKUs)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>On Sale</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skus.map((sku) => (
                <TableRow key={sku.id}>
                  <TableCell>{sku.sku}</TableCell>
                  <TableCell>{sku.name}</TableCell>
                  <TableCell>{sku.category}</TableCell>
                  <TableCell>
                    {sku.onSale === "Yes" ? (
                      <span>
                        <span className="line-through text-muted-foreground mr-2">
                          ${sku.price}
                        </span>
                        <span className="text-green-600">${sku.salePrice}</span>
                      </span>
                    ) : (
                      <span>${sku.price}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {sku.stockQuantity} {sku.unit}
                  </TableCell>
                  <TableCell>
                    {sku.onSale === "Yes" ? (
                      <Badge variant="success">On Sale</Badge>
                    ) : (
                      <Badge variant="secondary">Regular Price</Badge>
                    )}
                  </TableCell>
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
