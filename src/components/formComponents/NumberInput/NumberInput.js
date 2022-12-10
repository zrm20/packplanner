import React, { useEffect, useState } from "react";
import { useField } from "formik";
import { Text } from "react-native-paper";

import TextInput from "../TextInput/TextInput";

export default function NumberInput(props) {
  const [text, setText] = useState();
  const { setValue } = useField(props)[2];
  const { value } = useField(props)[0];

  useEffect(() => {
    setValue(parseFloat(text));
  }, [text]);

  return (
    <TextInput value={text} onChangeText={setText} keyboardType="numeric" {...props} />
  );
};
