import * as Yup from "yup";
export const productCreateSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().positive("Price must be positive"),
  hasOffer: Yup.boolean(),
  isMultipleVariant: Yup.boolean(),
  categoryId: Yup.string().required("Category is required"),
});
