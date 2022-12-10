import React from "react";
import { KeyboardAvoidingView } from "react-native";
import { Formik } from 'formik'
import { TextInput as PaperInput } from "react-native-paper";

import useStyles from "./PackForm.styles"
import { TextInput, WeightInput, NumberInput } from "../../formComponents";

export default function PackForm(props) {
  const styles = useStyles();

  const initialValues = props.initialValues || {
    brand: "",
    model: "",
    capacity: 0,
    weight: 0
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={props.handleSubmit}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding" >
        <TextInput name="brand" label="Brand" />
        <TextInput name="model" label="Model" />
        <NumberInput name="capacity" label="Capacity" right={<PaperInput.Affix text='liters' />} />
        <WeightInput name="weight" label="Weight" />
      </KeyboardAvoidingView >
    </Formik>
  );
};
