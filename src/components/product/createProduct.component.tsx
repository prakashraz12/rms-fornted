import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { DatePicker } from "../datePicker/datePicker.component";
import { ImageUploader } from "../imageUploader/imageUplaoder.component";
import { ComboProductList } from "./comboProductShowCase.component";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { productCreateSchema } from "@/schema/productCreateSchema";
import useGetCategory from "../category/hooks/useGetCategory";
import { useProductForm } from "@/hooks/useProductForm";
import { initialValues } from "@/types/product.type";

export const ProductCreationForm: React.FC = () => {
  const { category } = useGetCategory();

  const {
    selectedProducts,
    setSelectedProducts,
    isProductLoading,
    handleSubmit,
    image,
    setImage,
  } = useProductForm();

  return (
    <Card className="w-full container mx-auto mt-6">
      <CardContent>
        <ImageUploader image={image} setImage={setImage} />
        <br />
        <Formik
          initialValues={initialValues}
          validationSchema={productCreateSchema}
          onSubmit={async (values) => {
            handleSubmit(values);
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form className="space-y-6">
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
                  onCheckedChange={(checked) =>
                    setFieldValue("hasOffer", checked)
                  }
                />
                <Label htmlFor="hasOffer">Has Offer</Label>
              </div>

              {values?.hasOffer && (
                <div className="flex w-full items-center gap-4">
                  <div>
                    <Label htmlFor="offerPrice">Offer Price</Label>
                    <Field
                      as={Input}
                      type="number"
                      id="offerPrice"
                      name="offerPrice"
                    />
                    {errors.offerPrice && touched.offerPrice && (
                      <p className="text-sm text-red-500">
                        {errors.offerPrice}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 flex flex-col">
                    <Label htmlFor="offerValidUntil">Offer Valid Up Date</Label>
                    <DatePicker
                      date={values.offerValidUntil as Date}
                      setDate={(value) =>
                        setFieldValue("offerValidUntil", value)
                      }
                    />
                    {errors.offerValidUntil && touched.offerValidUntil && (
                      <p className="text-sm text-red-500">
                        {errors.offerValidUntil}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Switch
                  id="isMultipleVariant"
                  checked={values.isMultipleVariant}
                  onCheckedChange={(checked) =>
                    setFieldValue("isMultipleVariant", checked)
                  }
                />
                <Label htmlFor="isMultipleVariant">Multiple Variants</Label>
              </div>

              {values.isMultipleVariant && (
                <FieldArray name="variants">
                  {({ push, remove }) => (
                    <div className="space-y-4">
                      {values.variants.map((_, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <div>
                            <Label htmlFor="vId">Variant Name</Label>
                            <Field
                              as={Input}
                              name={`variants.${index}.name`}
                              placeholder="Variant Name"
                            />
                          </div>
                          <div>
                            <Label htmlFor="vId">Price</Label>
                            <Field
                              as={Input}
                              type="number"
                              name={`variants.${index}.price`}
                              placeholder="Variant Price"
                            />
                          </div>
                          <Button
                            className="mt-6"
                            type="button"
                            variant="destructive"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        onClick={() => push({ name: "", price: 0 })}
                      >
                        Add Variant
                      </Button>
                    </div>
                  )}
                </FieldArray>
              )}

              <div className="flex items-center space-x-2">
                <Switch
                  id="isCombo"
                  checked={values.isCombo}
                  onCheckedChange={(checked) =>
                    setFieldValue("isCombo", checked)
                  }
                />
                <Label htmlFor="isCombo">Combo Product</Label>
              </div>
              {values?.isCombo && (
                <ComboProductList
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                />
              )}
              <Button type="submit" disabled={isProductLoading}>
                Create Product
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};
