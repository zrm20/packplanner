import React, { useState } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { HelperText, IconButton, Subheading, Surface, Switch } from "react-native-paper";
import { Formik } from "formik";

import useStyles from "./InventoryForm.styles";
import { TextInput, WeightInput, SubmitButton, CapacityInput, PickerInput } from "../../formComponents";
import { useCategories } from "../../../hooks";
import inventoryFormSchema from "./InventoryForm.schema";

interface InventoryFormProps {
  initialValues?: ItemFormData;
  onSubmit(values: ItemFormData): void;
  submitText?: string;
  onDelete?(): void;
};

export default function InventoryForm(props: InventoryFormProps): JSX.Element {
  const styles = useStyles();
  const [showLiquid, setShowLiquid] = useState<boolean>(Boolean(props.initialValues?.liquidCapacity));
  const { categories } = useCategories();

  const initialValues: ItemFormData = props.initialValues || {
    brand: "",
    name: "",
    liquidCapacity: 0,
    weight: 0,
    category: '00' // defaults to miscCategory id
  };

  // TODO When showLiquid is toggled off, it should reset liquidCapacity to 0

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={props.onSubmit}
      validationSchema={inventoryFormSchema}
    >
      <KeyboardAvoidingView style={styles.container} behavior="height" >
        <PickerInput
          name='category'
          label="Category"
          data={categories.map(cat => ({ label: cat.label, value: cat.id }))}
        />

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
              The weight of the liquid will be automatically calculated.
            </HelperText>
            <CapacityInput name="liquidCapacity" label="Liquid Capacity" />
          </Surface>
        }

        <SubmitButton
          mode='contained-tonal'
          icon="content-save"
          style={[styles.fabs, styles.saveButton]}
        />

        {
          props.onDelete &&
          <IconButton
            mode='contained-tonal'
            icon="delete"
            style={[styles.fabs, styles.deleteButton]}
            onPress={props.onDelete}
          />
        }
      </KeyboardAvoidingView >
    </Formik >
  );
};
