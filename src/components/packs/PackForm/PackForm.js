import React from "react";
import { KeyboardAvoidingView } from "react-native";
import { Formik } from 'formik'

import useStyles from "./PackForm.styles"
import TextInput from "../../formComponents/TextInput/TextInput";
import WeightInput from "../../formComponents/WeightInput/WeightInput";

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
        <TextInput name="capacity" label="Capacity" />
        <WeightInput name="weight" label="Weight" />
      </KeyboardAvoidingView >
    </Formik>
  );
};
