import React from "react";
import { KeyboardAvoidingView } from "react-native";
import { Formik, FormikHelpers } from 'formik'
import { TextInput as PaperInput } from "react-native-paper";

import useStyles from "./PackForm.styles"
import { TextInput, WeightInput, NumberInput, SubmitButton } from "../../formComponents";
import packFormSchema from "./PackForm.schema";

interface PackFormProps {
  initialValues?: PackFormData;
  onSubmit(values: PackFormData, actions?: FormikHelpers<PackFormData>): void;
  submitText?: string;
};

export default function PackForm(props: PackFormProps): JSX.Element {
  const styles = useStyles();

  const initialValues: PackFormData = props.initialValues || {
    brand: "",
    model: "",
    capacity: 0,
    weight: 0,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={props.onSubmit}
      validationSchema={packFormSchema}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding" >
        <TextInput name="brand" label="Brand" />
        <TextInput name="model" label="Model" />
        <NumberInput name="capacity" label="Capacity" right={<PaperInput.Affix text='liters' />} />
        <WeightInput name="weight" label="Weight" />

        <SubmitButton mode='contained'>{props.submitText || "Add Pack"}</SubmitButton>
      </KeyboardAvoidingView >
    </Formik>
  );
};
