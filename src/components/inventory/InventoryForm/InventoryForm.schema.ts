import * as Yup from "yup";

const inventoryFormSchema = Yup.object(
  {
    brand: Yup.string(),
    name: Yup.string()
      .required("Item name is required")
      .min(1, "Must be at lease 1 character"),
    liquidCapacity: Yup.number()
      .min(0, "Negative numbers not allowed"),
    weight: Yup.number()
      .required("Weight is required")
      .min(.1, "Must be a positive number"),
    category: Yup.string() // uses a Picker input, little validation required
      .required("Category is required")
  }
);

export default inventoryFormSchema;