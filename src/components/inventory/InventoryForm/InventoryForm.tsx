import React, { useState } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { HelperText, Subheading, Surface, Switch } from "react-native-paper";
import { Formik } from "formik";

import useStyles from "./InventoryForm.styles";
import { TextInput, WeightInput, SubmitButton, CapacityInput } from "../../formComponents";

interface InventoryFormProps {
  initialValues?: ItemFormData;
  onSubmit(values: ItemFormData): void;
  submitText?: string;
};

export default function InventoryForm(props: InventoryFormProps): JSX.Element {
  const styles = useStyles();
  const [showLiquid, setShowLiquid] = useState(false);

  const initialValues: ItemFormData = props.initialValues || {
    brand: "",
    name: "",
    liquidCapacity: 0,
    weight: 0,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={props.onSubmit}
    >
      <KeyboardAvoidingView style={styles.container} behavior="height" >
        <TextInput name="brand" label="Brand" />
        <TextInput name="name" label="Name" />
        <WeightInput name="weight" label="Weight" />

        <View style={styles.liquidEnableSection}>
          <Subheading style={styles.enableLiquidLabel}>Liquid Container?</Subheading>
          <Switch value={showLiquid} onValueChange={() => setShowLiquid(!showLiquid)} />
        </View>

        {
          showLiquid &&
          <Surface style={styles.liquidSection}>
            <Subheading style={styles.liquidTitle}>Liquid Capacity</Subheading>
            <HelperText type='info'>
              Items such as water bottles have a liquid capacity property.
              The weight of the item should be the weight of the empty container.
              The weight of the water will be automatically calculated.
            </HelperText>
            <CapacityInput name="liquidCapacity" label="Liquid Capacity" />
          </Surface>
        }

        <SubmitButton mode='contained'>{props.submitText || "Add Pack"}</SubmitButton>
      </KeyboardAvoidingView >
    </Formik >
  );
};
