import React from "react";
import { View } from "react-native";
import { HelperText, TextInput as PaperInput, TextInputProps, withTheme } from "react-native-paper";
import { useField } from "formik";

import useStyles from "./TextInput.styles"

type CustomTextInputProps = TextInputProps  & {
  name: string
  label?: string,
};

function TextInput(props: CustomTextInputProps): JSX.Element {
  const styles = useStyles();
  const [field, meta, util] = useField(props.name);

  const showError: boolean = Boolean(meta.touched && meta.error);

  return (
    <View style={[styles.container, props.style]} >
      <PaperInput
        value={field.value}
        onChangeText={util.setValue}
        error={showError}
        label={props.label || props.name}
        mode="outlined"
        {...props}
      />
      {
        showError &&
        <HelperText type="error">{meta.error}</HelperText>
      }
    </View>
  );
};

export default withTheme(TextInput);
