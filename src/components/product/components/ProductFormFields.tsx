import React from "react";
import { Field } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { DatePicker } from "../../datePicker/datePicker.component";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFormFieldsProps {
  values: any;
  errors: any;
  touched: any;
  setFieldValue: (field: string, value: any) => void;
  category: any[];
}

export const ProductFormFields: React.FC<ProductFormFieldsProps> = ({
  values,
  errors,
  touched,
  setFieldValue,
  category,
}) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Product Name</Label>
        <Field as={Input} id="name" name="name" />
        {errors.name && touched.name && (
          <p className="text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Field as={Textarea} id="description" name="description" />
        {errors.description && touched.description && (
          <p className="text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Field as={Input} type="number" id="price" name="price" />
        {errors.price && touched.price && (
          <p className="text-sm text-red-500">{errors.price}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="categoryId">Category</Label>
        <Select
          onValueChange={(value) => setFieldValue("categoryId", value)}
          value={values.categoryId}
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
        {errors.categoryId && touched.categoryId && (
          <p className="text-sm text-red-500">{errors.categoryId}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="hasOffer"
          checked={values.hasOffer}
          onCheckedChange={(checked) => setFieldValue("hasOffer", checked)}
        />
        <Label htmlFor="hasOffer">Has Offer</Label>
      </div>

      {values?.hasOffer && (
        <div className="flex w-full items-center gap-4">
          <div>
            <Label htmlFor="offerPrice">Offer Price</Label>
            <Field as={Input} type="number" id="offerPrice" name="offerPrice" />
            {errors.offerPrice && touched.offerPrice && (
              <p className="text-sm text-red-500">{errors.offerPrice}</p>
            )}
          </div>
          <div>
            <Label>Offer Valid Until</Label>
            <DatePicker
              date={values.offerValidUntil}
              setDate={(date) => setFieldValue("offerValidUntil", date)}
            />
          </div>
        </div>
      )}
    </>
  );
};
