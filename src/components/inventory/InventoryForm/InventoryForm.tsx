import React from "react";
import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from "react-native";
import { Button } from "react-native-paper";
import { Formik } from "formik";

import useStyles from "./InventoryForm.styles";
import { TextInput, WeightInput, SubmitButton, PickerInput, FormikBackdrop, FormActions } from "../../formComponents";
import { useCategories } from "../../../hooks";
import inventoryFormSchema from "./InventoryForm.schema";
import ShowLiquidInput from "./ShowLiquidInput";

interface InventoryFormProps {
  initialValues?: ItemFormData;
  onSubmit(values: ItemFormData): void;
  submitText?: string;
  onDelete?(): void;
};

export default function InventoryForm(props: InventoryFormProps): JSX.Element {
  const styles = useStyles();
  const { categories } = useCategories();

  const initialValues: ItemFormData = props.initialValues || {
    brand: "",
    name: "",
    liquidCapacity: 0,
    weight: 0,
    category: '00' // defaults to miscCategory id
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={props.onSubmit}
      validationSchema={inventoryFormSchema}
    >
      <>
        <FormikBackdrop />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView style={styles.container} behavior="padding" >

            <PickerInput
              name='category'
              label="Category"
              data={categories.map(cat => ({ label: cat.label, value: cat.id }))}
            />

            <TextInput name="brand" label="Brand" />
            <TextInput name="name" label="Name" />
            <WeightInput name="weight" label="Weight" />

            <ShowLiquidInput />

            <FormActions onDelete={props.onDelete} />
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </>
    </Formik >
  );
};
