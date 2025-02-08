import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { DatePicker } from "@/components/datePicker/datePicker.component";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetCategory from "../category/hooks/useGetCategory";
import { ComboProductList } from "./comboProductShowCase.component";
import { productSchema } from "@/schema/productCreateSchema";
import ImageUploader from "./imageUploader.component";
import { toast } from "@/hooks/use-toast";
import { useCreateProductMutation } from "@/services/api/product.api";
import { PRODUCT_TYPE } from "@/enums/productType.enum";
import { PlusIcon } from "lucide-react";
import ExistingInventoryTable from "./existingInventoryTable.component";

type ProductFormValues = z.infer<typeof productSchema>;

export const ProductCreationForm: React.FC = () => {
  const [inventoryType, setInventoryType] = useState<string>("ex");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [
    createProduct,
    { isLoading: isProductLoading, isSuccess: isProductCreated },
  ] = useCreateProductMutation();

  const submit = async (values: any) => {
    try {
      const formData = new FormData();
      if (image) {
        formData.append("image", image as any);
      }
      formData.append("name", values?.name);
      formData.append("description", values?.description);
      formData.append("price", values?.price?.toString());

      if (values?.hasOffer) {
        formData.append("isOffer", JSON.stringify(values?.hasOffer));
        formData.append("offerPrice", values?.offerPrice?.toString());
        formData.append("offerValidUntil", values?.offerValidUntil);
      }

      formData.append("categoryId", values?.categoryId?.toString());

      if (values?.isCombo) {
        formData.append("productType", PRODUCT_TYPE.COMBO);
        formData.append("comboItems", JSON.stringify(values?.comboProducts));
      } else {
        formData.append("productType", PRODUCT_TYPE.SINGLE);
      }

      if (values?.isInventoryManagementEnabled) {
        if (values?.inventoryId) {
          formData.append("inventoryId", values?.inventoryId);
        } else {
          formData.append(
            "isInventoryManagementEnabled",
            JSON.stringify(values?.isInventoryManagementEnabled)
          );
          formData.append(
            "currentStockLevel",
            values?.currentStockLevel?.toString()
          );
          formData.append(
            "minimumStockLevel",
            values?.minimumStockLevel?.toString()
          );
          formData.append("measurementUnit", values?.measurementUnit);
        }
      }

      if (values?.isMultipleVariant) {
        formData.append(
          "isMultipleVariant",
          JSON.stringify(values?.isMultipleVariant)
        );
        formData.append("variants", JSON.stringify(values?.variants));
      }

      await createProduct(formData);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  useEffect(() => {
    if (isProductCreated) {
      toast({
        title: "Product created successfully",
        description: "Product created successfully",
        variant: "default",
      });
    }
  }, [isProductCreated]);
  const { category } = useGetCategory();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      categoryId: "",
      hasOffer: false,
      isMultipleVariant: false,
      variants: [],
      isCombo: false,
      isInventoryManagementEnabled: false,
      inventoryId: "",
      currentStockLevel: 0,
      minimumStockLevel: 0,
      measurementUnit: "pcs",
      comboProducts: [],
      offerPrice: 0,
      offerValidUntil: undefined,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const watchHasOffer = watch("hasOffer");
  const watchIsMultipleVariant = watch("isMultipleVariant");
  const watchIsCombo = watch("isCombo");
  const watchInventoryManagement = watch("isInventoryManagementEnabled");

  console.log(errors);

  return (
    <div className="container mx-auto mt-6">
      <h1 className="text-2xl font-bold">Create New Product</h1>
      <p className="text-sm mt-2 text-muted-foreground">
        Create a new product form here.
      </p>
      <Card className="mt-6 max-w-6xl rounded-lg">
        <CardContent className="space-y-2">
          <br />
          <h1 className="text-sm font-semibold">Banner Image</h1>
          <ImageUploader
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
            file={image}
            setFile={setImage}
          />
          <form onSubmit={handleSubmit(submit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {!watchIsMultipleVariant && (
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  type="number"
                  id="price"
                  {...register("price", { valueAsNumber: true })}
                />
                {errors.price && (
                  <p className="text-sm text-red-500">{errors.price.message}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="categoryId">Category</Label>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {category?.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.categoryId && (
                <p className="text-sm text-red-500">
                  {errors.categoryId.message}
                </p>
              )}
            </div>

            {!watchIsMultipleVariant && (
              <div className="flex items-center space-x-2">
                <Controller
                  name="hasOffer"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="hasOffer"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="hasOffer">Has Offer</Label>
              </div>
            )}

            {watchHasOffer && !watchIsMultipleVariant && (
              <div className="flex w-full items-center gap-4">
                <div>
                  <Label htmlFor="offerPrice">Offer Price</Label>
                  <Input
                    type="number"
                    id="offerPrice"
                    {...register("offerPrice", { valueAsNumber: true })}
                  />
                  {errors.offerPrice && (
                    <p className="text-sm text-red-500">
                      {errors.offerPrice.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2 flex flex-col">
                  <Label htmlFor="offerValidUntil">Offer Valid Up Date</Label>
                  <Controller
                    name="offerValidUntil"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        date={field.value as Date}
                        setDate={(date) => field.onChange(date)}
                      />
                    )}
                  />
                  {errors.offerValidUntil && (
                    <p className="text-sm text-red-500">
                      {errors.offerValidUntil.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Controller
                name="isMultipleVariant"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="isMultipleVariant"
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      if (!checked) {
                        setValue("variants", []);
                      } else {
                        setValue("variants", [{ name: "", price: 0 }]);
                      }
                    }}
                  />
                )}
              />
              <Label htmlFor="isMultipleVariant">Multiple Variants</Label>
            </div>
            <p className="text-sm text-red-500">{errors.variants?.message}</p>

            {watchIsMultipleVariant && (
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-2">
                    <div>
                      <Label htmlFor={`variants.${index}.name`}>
                        Variant Name
                      </Label>
                      <Input
                        {...register(`variants.${index}.name`)}
                        placeholder="Variant Name"
                      />
                      {errors.variants?.[index]?.name && (
                        <p className="text-sm text-red-500">
                          {errors.variants?.[index]?.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor={`variants.${index}.price`}>Price</Label>
                      <Input
                        type="number"
                        {...register(`variants.${index}.price`, {
                          valueAsNumber: true,
                        })}
                        placeholder="Variant Price"
                      />
                      {errors.variants?.[index]?.price && (
                        <p className="text-sm text-red-500">
                          {errors.variants?.[index]?.price.message}
                        </p>
                      )}
                    </div>
                    {fields.length > 1 && index !== fields.length - 1 && (
                      <Button
                        className="mt-6"
                        type="button"
                        variant="destructive"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  size={"sm"}
                  type="button"
                  onClick={() => append({ name: "", price: 0 })}
                >
                  Add More Variant <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Controller
                name="isCombo"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="isCombo"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="isCombo">Combo Product</Label>
            </div>
            {errors.comboProducts?.message && (
              <p className="text-sm text-red-500">
                {errors.comboProducts?.message}
              </p>
            )}
            {watchIsCombo && (
              <Controller
                name="comboProducts"
                control={control}
                render={({ field }) => (
                  <ComboProductList
                    selectedProducts={
                      field.value
                        ? field.value.map((item) => ({
                            productId: Number(item.productId),
                            quantity: item.quantity,
                          }))
                        : []
                    }
                    setSelectedProducts={field.onChange}
                  />
                )}
              />
            )}

            <div className="flex items-center space-x-2">
              <Controller
                name="isInventoryManagementEnabled"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="isInventoryManagementEnabled"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="inventoryManagement">
                Enable Inventory Management
              </Label>
            </div>

            {watchInventoryManagement && (
              <>
                <div className="flex  space-x-2">
                  <Button
                    type="button"
                    variant={inventoryType === "ex" ? "default" : "outline"}
                    className="rounded-none w-full"
                    onClick={() => setInventoryType("ex")}
                  >
                    Apply Exiting Inventory
                  </Button>
                  <Button
                    type="button"
                    variant={inventoryType === "new" ? "default" : "outline"}
                    className="rounded-none w-full"
                    onClick={() => setInventoryType("new")}
                  >
                    Create New Inventory
                  </Button>
                </div>
                <div className="flex flex-wrap space-x-2">
                  {inventoryType === "ex" && (
                    <ExistingInventoryTable
                      onSelectInventory={(inventoryId) => {
                        setValue("inventoryId", inventoryId);
                      }}
                    />
                  )}
                  {inventoryType === "new" && (
                    <div className="space-y-4 w-full lg:w-1/2 border rounded-lg p-4">
                      <h1 className="text-sm font-bold">
                        Create New Inventory
                      </h1>
                      <div>
                        <Label htmlFor="minimumStockLevel">
                          Minimum Stock Level
                        </Label>
                        <Input
                          type="number"
                          id="minimumStockLevel"
                          {...register("minimumStockLevel", {
                            valueAsNumber: true,
                          })}
                        />
                        {errors.minimumStockLevel && (
                          <p className="text-sm text-red-500">
                            {errors.minimumStockLevel.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="currentStockLevel">
                          Current Stock Level
                        </Label>
                        <Input
                          type="number"
                          id="currentStockLevel"
                          {...register("currentStockLevel", {
                            valueAsNumber: true,
                          })}
                        />
                        {errors.currentStockLevel && (
                          <p className="text-sm text-red-500">
                            {errors.currentStockLevel.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="measurementUnit">
                          Measurement Unit
                        </Label>
                        <Controller
                          name="measurementUnit"
                          control={control}
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a unit" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="kg">
                                  Kilogram (kg)
                                </SelectItem>
                                <SelectItem value="ml">
                                  Milliliter (ml)
                                </SelectItem>
                                <SelectItem value="pcs">
                                  Pieces (pcs)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.measurementUnit && (
                          <p className="text-sm text-red-500">
                            {errors.measurementUnit.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="flex justify-end">
              <Button type="submit" disabled={isProductLoading}>
                Create Product
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
