import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { PurchuseReponse } from "@/types/purchuses.type";

const purchaseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  unit: z.number().min(1, "Unit must be at least 1"),
  unitPrice: z.number().min(0, "Unit price must be non-negative"),
  totalPrice: z.number().min(0, "Total price must be non-negative"),
});

type PurchaseFormData = z.infer<typeof purchaseSchema>;

interface PurchaseFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PurchaseFormData) => void;
  initialData: PurchuseReponse | null;
  isEditing: boolean;
}

export const PurchaseFormDialog: React.FC<PurchaseFormDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditing,
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PurchaseFormData>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: initialData || {
      name: "",
      category: "",
      unit: 1,
      unitPrice: 0,
      totalPrice: 0,
    },
  });

  const onFormSubmit = (data: PurchaseFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Purchase" : "Repurchase"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" className="col-span-3" {...register("name")} />
              {errors.name && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Liquors">Liquors</SelectItem>
                      <SelectItem value="Beer">Beer</SelectItem>
                      <SelectItem value="Wine">Wine</SelectItem>
                      <SelectItem value="Soft Drinks">Soft Drinks</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unit" className="text-right">
                Unit
              </Label>
              <Input
                id="unit"
                type="number"
                className="col-span-3"
                {...register("unit", { valueAsNumber: true })}
              />
              {errors.unit && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.unit.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unitPrice" className="text-right">
                Unit Price
              </Label>
              <Input
                id="unitPrice"
                type="number"
                className="col-span-3"
                {...register("unitPrice", { valueAsNumber: true })}
              />
              {errors.unitPrice && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.unitPrice.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="totalPrice" className="text-right">
                Total Price
              </Label>
              <Input
                id="totalPrice"
                type="number"
                className="col-span-3"
                {...register("totalPrice", { valueAsNumber: true })}
              />
              {errors.totalPrice && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.totalPrice.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{isEditing ? "Update" : "Repurchase"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
