import React, { useEffect, useState } from "react";
import { useField } from "formik";
import { withTheme } from "react-native-paper";

import TextInput, { CustomTextInputProps } from "../TextInput/TextInput";

function NumberInput(props: CustomTextInputProps): JSX.Element {
  const { value } = useField<number>(props.name)[0]; // holds the actual number value stored in form state
  const { setValue } = useField<number>(props.name)[2];
  const initialText = value ? value.toString() : '';
  const [text, setText] = useState<string>(initialText); // holds the string value of the input

  if(typeof value !== 'number' && typeof value !== 'undefined') {
    throw new Error(`Field "${props.name}" return a value of type ${typeof value}, but should be a number`);
  };

  useEffect(() => {
    setValue(parseFloat(text)); // when text field is changed, parse the value and set the forms (number) value to match
  }, [text]);

  return (
    <TextInput value={text} onChangeText={setText} keyboardType="numeric" {...props} />
  );
};

export default withTheme(NumberInput);
