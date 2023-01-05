import React, { useState } from "react";
import { KeyboardAvoidingView, View, ScrollView } from "react-native";
import { HelperText, Subheading, Surface, Switch, Text } from "react-native-paper";
import { Formik } from "formik";

import useStyles from "./InventoryForm.styles";
import { TextInput, WeightInput, SubmitButton, CapacityInput } from "../../formComponents";

export default function InventoryForm(props) {
  const styles = useStyles();
  const [showLiquid, setShowLiquid] = useState(false);

  const initialValues = props.initialValues || {
    category: "",
    brand: "",
    name: "",
    liquidCapacity: 0,
    weight: null,
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
            <HelperText>
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
