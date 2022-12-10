import React, { useEffect, useState } from "react";
import { useField } from "formik";
import { Text } from "react-native-paper";

import TextInput from "../TextInput/TextInput";

export default function NumberInput(props) {
  const { value } = useField(props)[0];
  const { setValue } = useField(props)[2];
  const [text, setText] = useState(value.toString());

  useEffect(() => {
    setValue(parseFloat(text));
  }, [text]);

  return (
    <TextInput value={text} onChangeText={setText} keyboardType="numeric" {...props} />
  );
};
