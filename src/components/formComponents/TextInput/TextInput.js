import React from "react";
import { View } from "react-native";
import { HelperText, TextInput as PaperInput } from "react-native-paper";
import { useField } from "formik";

import useStyles from "./TextInput.styles"

export default function TextInput(props) {
  const styles = useStyles();
  const [field, meta, util] = useField(props)

  return (
    <View style={[styles.container, props.style]} >
      <PaperInput
        value={field.value}
        onChangeText={util.setValue}
        error={meta.touched && meta.error}
        label={props.label || props.name}
        mode="outlined"
        {...props}
      />
      {
        meta.touched && meta.error &&
        <HelperText type="error">{meta.error}</HelperText>
      }
    </View>
  );
};
