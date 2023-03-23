import React from "react";
import { Formik } from "formik";
import { Alert, View } from "react-native";
import { Divider, IconButton, Tooltip } from "react-native-paper";

import { FormikBackdrop, SubmitButton, TextInput } from "../../formComponents";
import ToggleSwitchInput from "../../formComponents/ToggleSwitchInput/ToggleSwitchInput";
import { CloseScreenButton } from "../../ui";
import CategoryIconPicker from "../CategoryIconPicker/CategoryIconPicker";
import useStyles from "./CategoryForm.styles";
import categoryFormSchema from "./CategoryForm.schema";

interface CategoryFormProps {
  category?: CategoryData;
  onSubmit(values: CategoryFormData): void
  onDelete?(): void;
};

export default function CategoryForm(props: CategoryFormProps): JSX.Element {
  const styles = useStyles();

  const initialValues: CategoryFormData = {
    label: props.category?.label || "",
    icon: props.category?.icon || "tent",
    isBaseWeightExempt: props.category?.isBaseWeightExempt || false
  };

  function aboutBaseWeight(): void {
    Alert.alert("Items that are \"Base Weight Exempt\" will NOT count towards your pack's base weight. Typically food, fuel, water, and other consumable items are considered \"Base Weight Exempt\".")
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={props.onSubmit}
      validationSchema={categoryFormSchema}
    >
      <>
        <FormikBackdrop />
        <View style={styles.container} >
          <View style={styles.toolbar}>
            <CloseScreenButton androidOnly />

            <SubmitButton icon="content-save" mode="outlined" />
            {
              Boolean(props.onDelete) &&
              <IconButton icon="delete" mode="outlined" onPress={props.onDelete} />
            }
          </View>
          <TextInput name="label" label="Category Name" />

          <View style={styles.baseWeightContainer}>
            <Tooltip title="Base Weight">
              <IconButton icon="information" onPress={aboutBaseWeight} />
            </Tooltip>

            <ToggleSwitchInput name="isBaseWeightExempt" label="Base Weight Exempt" />
          </View>

          <Divider />

          <View style={styles.iconContainer}>
            <CategoryIconPicker />
          </View>
        </View>
      </>
    </Formik>
  );
};
