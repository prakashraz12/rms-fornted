import { useGetProductByIdQuery } from "@/services/api/product.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import useGetCategory from "../category/hooks/useGetCategory";
import { z } from "zod";
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

// import { ComboProductList } from "./comboProductShowCase.component";
import { useEffect, useState } from "react";
import { productSchema } from "@/schema/productCreateSchema";
import ImageUploader from "./imageUploader.component";

type ProductFormValues = z.infer<typeof productSchema>;

const EditproductComponent = ({ id }: { id: number }) => {
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { data, isLoading } = useGetProductByIdQuery(id);
  // const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const { category } = useGetCategory();
  // const {
  //   selectedProducts,
  //   setSelectedProducts,
  //   isProductLoading,
  //   handleSubmit: handleProductSubmit,
  //   image,
  //   setImage,
  // } = useProductForm();

  console.log(image);
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
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
      currentStockLevel: 0,
      minimumStockLevel: 0,
      measurementUnit: "pcs",
      offerPrice: 0,
      offerValidUntil: undefined,
      comboProducts: [],
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

  // const onSubmit = async (data: ProductFormValues) => {
  //   try {
  //     await updateProduct({
  //       id,
  //       data: {
  //         name: data.name,
  //         description: data.description,
  //         price: data.price.toString(),
  //         categoryId: parseInt(data.categoryId),
  //         isOffer: data.hasOffer,
  //         offerPrice: data.offerPrice?.toString(),
  //         offerValidUntil: data.offerValidUntil,
  //         isMultipleVariant: data.isMultipleVariant,
  //         variants: data.variants,
  //         isCombo: data.isCombo,
  //         comboItems: selectedProducts,
  //         image,
  //         currentStockLevel: data.currentStockLevel,
  //         minimumStockLevel: data.minimumStockLevel,
  //         measurementUnit: data.measurementUnit,
  //         isInventoryManagementEnabled: data.isInventoryManagementEnabled,
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Error updating product:", error);
  //   }
  // };

  useEffect(() => {
    if (data) {
      setValue("price", parseInt(data.data.price));
      setValue("name", data.data.name);
      setValue("description", data.data.description);
      setValue("categoryId", data.data.category?.id);
      setValue("hasOffer", data.data.isOffer);
      setValue("offerPrice", data.data.offerPrice || 0);
      setValue("offerValidUntil", data.data.offerValidUntil || "");
      setValue("isMultipleVariant", data.data.isMultipleVariant || false);
      setValue("isCombo", data.data.isCombo || false);
      setValue(
        "isInventoryManagementEnabled",
        data.data.isInventoryManagementEnabled || false
      );
      setValue("minimumStockLevel", data.data.minimumStockLevel);
      setValue("currentStockLevel", data.data.currentStockLevel);
      setValue("measurementUnit", data.data.measurementUnit);
      setValue("comboProducts", data.data.comboItems || []);
      setValue("variants", data.data.variants || []);
      setPreviewImage(data.data.image?.url);
    }
  }, [data]);

  console.log(errors, "errors");
  return (
    <div className="container mx-auto mt-6">
      <h1 className="text-2xl font-bold">Edit Product</h1>
      <p className="text-sm mt-2 text-muted-foreground">
        Update your product details here
      </p>
      <Card className="mt-6 rounded-xl max-w-6xl">
        <CardContent className="p-6 space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <>
              <h1 className="text-sm font-semibold mb-2">Banner Image</h1>
              <ImageUploader
                previewImage={previewImage}
                setPreviewImage={setPreviewImage}
                setFile={setImage}
                file={image}
              />
              <form onSubmit={() => {}} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" {...register("name")} />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
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
                      <p className="text-sm text-red-500">
                        {errors.price.message}
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="categoryId">Category</Label>
                  <Controller
                    name="categoryId"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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

                {watchHasOffer && (
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
                      <Label htmlFor="offerValidUntil">
                        Offer Valid Up Date
                      </Label>
                      <Controller
                        name="offerValidUntil"
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            date={field.value as any}
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

                {watchIsMultipleVariant && (
                  <div className="space-y-4">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex items-center space-x-2"
                      >
                        <div>
                          <Label htmlFor={`variants.${index}.name`}>
                            Variant Name
                          </Label>
                          <Input
                            {...register(`variants.${index}.name`)}
                            placeholder="Variant Name"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`variants.${index}.price`}>
                            Price
                          </Label>
                          <Input
                            type="number"
                            {...register(`variants.${index}.price`, {
                              valueAsNumber: true,
                            })}
                            placeholder="Variant Price"
                          />
                        </div>
                        {index !== 0 && (
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
                      type="button"
                      onClick={() => append({ name: "", price: 0 })}
                    >
                      Add Variant
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

                {watchIsCombo && (
                  <></>
                  // <ComboProductList
                  //   selectedProducts={selectedProducts}
                  //   setSelectedProducts={setSelectedProducts}
                  // />
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
                  // <div className="space-y-4">
                  //   <div>
                  //     <Label htmlFor="minimumStockLevel">
                  //       Minimum Stock Level
                  //     </Label>
                  //     <Input
                  //       type="number"
                  //       id="minimumStockLevel"
                  //       {...register("minimumStockLevel", {
                  //         valueAsNumber: true,
                  //       })}
                  //     />
                  //     {errors.minimumStockLevel && (
                  //       <p className="text-sm text-red-500">
                  //         {errors.minimumStockLevel.message}
                  //       </p>
                  //     )}
                  //   </div>
                  //   <div>
                  //     <Label htmlFor="currentStockLevel">
                  //       Current Stock Level
                  //     </Label>
                  //     <Input
                  //       type="number"
                  //       id="currentStockLevel"
                  //       {...register("currentStockLevel", {
                  //         valueAsNumber: true,
                  //       })}
                  //     />
                  //     {errors.currentStockLevel && (
                  //       <p className="text-sm text-red-500">
                  //         {errors.currentStockLevel.message}
                  //       </p>
                  //     )}
                  //   </div>
                  //   <div>
                  //     <Label htmlFor="measurementUnit">Measurement Unit</Label>
                  //     <Controller
                  //       name="measurementUnit"
                  //       control={control}
                  //       render={({ field }) => (
                  //         <Select
                  //           onValueChange={field.onChange}
                  //           value={field.value}
                  //         >
                  //           <SelectTrigger>
                  //             <SelectValue placeholder="Select a unit" />
                  //           </SelectTrigger>
                  //           <SelectContent>
                  //             <SelectItem value="kg">Kilogram (kg)</SelectItem>
                  //             <SelectItem value="ml">
                  //               Milliliter (ml)
                  //             </SelectItem>
                  //             <SelectItem value="pcs">Pieces (pcs)</SelectItem>
                  //           </SelectContent>
                  //         </Select>
                  //       )}
                  //     />
                  //     {errors.measurementUnit && (
                  //       <p className="text-sm text-red-500">
                  //         {errors.measurementUnit.message}
                  //       </p>
                  //     )}
                  //   </div>
                  // </div>
                  <div className="flex flex-wrap">
                    <div></div>
                    <div></div>
                  </div>
                )}

                {/* <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? "Updating..." : "Update Product"}
                </Button> */}
              </form>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EditproductComponent;
