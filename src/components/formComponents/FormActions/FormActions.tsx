import { useFormikContext } from "formik";
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { useTheme } from "../../../theme";

import useStyles from "./FormActions.styles";

interface FormActionsProps {
  onDelete?(args: any): void;
};

export default function FormActions(props: FormActionsProps): JSX.Element {
  const styles = useStyles();
  const { submitForm, isSubmitting } = useFormikContext();
  const { colors } = useTheme();

  return (
    <View style={styles.container} >
      <Button
        mode="contained"
        onPress={submitForm}
        disabled={isSubmitting}
      >
        Save
      </Button>
      {
        Boolean(props.onDelete) &&
        <Button mode="contained" buttonColor={colors.error} onPress={props.onDelete}>
          Delete
        </Button>
      }
    </View>
  );
};
