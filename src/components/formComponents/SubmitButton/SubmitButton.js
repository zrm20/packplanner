import React from "react";
import { Button, IconButton } from "react-native-paper";
import { useFormikContext } from "formik";


export default function SubmitButton({ iconButton = false, children, ...props }) {
  const { submitForm } = useFormikContext()

  if (iconButton) {
    return (
      <IconButton onPress={submitForm} {...props} />
    )
  };

  return (
    <Button onPress={submitForm} {...props} >
      {children}
    </Button>
  );
};
