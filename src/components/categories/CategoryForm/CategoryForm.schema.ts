import * as Yup from "yup";

const categoryFormSchema = Yup.object(
  {
    label: Yup.string()
      .required("Custom categories require a name"),
    icon: Yup.string(), // Custom select input, no validateion needed
    isBaseWeightExempt: Yup.boolean() // switch input, no validation needed
  }
);

export default categoryFormSchema;