import React from "react";
import { useFormikContext } from "formik";

import { LoadingBackdrop } from "../../ui";
import { Portal } from "react-native-paper";

export default function FormikBackdrop(): JSX.Element {
  const { isSubmitting } = useFormikContext();

  return (
    <Portal>
      <LoadingBackdrop show={isSubmitting} />
    </Portal>
  )
};
