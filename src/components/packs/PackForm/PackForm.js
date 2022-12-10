import React from "react";
import { View } from "react-native";
import { Formik } from 'formik'

import useStyles from "./PackForm.styles"
import TextInput from "../../formComponents/TextInput/TextInput";

export default function PackForm(props) {
  const styles = useStyles();

  const initialValues = props.initialValues || {
    brand: "",
    model: "",
    capacity: "",
    weight: ""
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={props.handleSubmit}
    >
      <View style={styles.container} >
        <TextInput name="brand" label="Brand" />
        <TextInput name="model" label="Model" />
        <TextInput name="capacity" label="Capacity" />
        <TextInput name="weight" label="Weight" />
      </View >
    </Formik>
  );
};
