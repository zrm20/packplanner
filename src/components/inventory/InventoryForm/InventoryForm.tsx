import React from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { Formik } from "formik";

import useStyles from "./InventoryForm.styles";
import { TextInput, WeightInput, SubmitButton, PickerInput, FormikBackdrop } from "../../formComponents";
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
        <KeyboardAvoidingView style={styles.container} behavior="padding" >

          <ScrollView style={styles.scrollView}>
            <PickerInput
              name='category'
              label="Category"
              data={categories.map(cat => ({ label: cat.label, value: cat.id }))}
            />

            <TextInput name="brand" label="Brand" />
            <TextInput name="name" label="Name" />
            <WeightInput name="weight" label="Weight" />

            <ShowLiquidInput />

            <SubmitButton mode="contained" style={styles.actionButtons}>Save</SubmitButton>

            {
              props.onDelete &&
              <Button
                style={[styles.actionButtons, styles.deleteButton]}
                mode="contained"
                onPress={props.onDelete}
              >
                Delete
              </Button>
            }
          </ScrollView >
        </KeyboardAvoidingView>
      </>
    </Formik >
  );
};
