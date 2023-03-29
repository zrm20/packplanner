import React from "react";
import { NativeSyntheticEvent, TextInputSubmitEditingEventData, View } from "react-native";
import { HelperText, TextInput as PaperInput, TextInputProps, withTheme } from "react-native-paper";
import { useField, useFormikContext } from "formik";

import useStyles from "./TextInput.styles"

export type CustomTextInputProps = TextInputProps & {
  name: string
  label?: string,
  submitOnEnter?: boolean
};

type SubmitEvent = NativeSyntheticEvent<TextInputSubmitEditingEventData>;

function TextInput(props: CustomTextInputProps): JSX.Element {
  const styles = useStyles();
  const [field, meta, util] = useField(props.name);
  const { submitForm } = useFormikContext();

  function handleSubmit(evt: SubmitEvent): void {
    submitForm();
  };

  const showError: boolean = Boolean(meta.touched && meta.error);

  return (
    <View style={[styles.container, props.style]} >
      <PaperInput
        value={field.value}
        onChangeText={util.setValue}
        error={showError}
        label={props.label || props.name}
        mode="outlined"
        returnKeyType="done"
        {...props}
        onSubmitEditing={props.submitOnEnter ? handleSubmit : props.onSubmitEditing}
      />
      {
        showError &&
        <HelperText type="error">{meta.error}</HelperText>
      }
    </View>
  );
};

export default withTheme(TextInput);
