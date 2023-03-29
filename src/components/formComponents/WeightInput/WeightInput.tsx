import React, { useState } from "react";
import { View } from "react-native";
import { TextInput as PaperInput, HelperText, ToggleButton, TextInputProps, withTheme } from "react-native-paper";
import { useField } from "formik";

import { ToggleButtonText } from "../../ui";
import useStyles from "./WeightInput.styles"
import { kgToLbs, kgToOz, ozToKg, lbsToKg, roundedKg } from "../../../utils/weightConversions/weightConversions";

/*
  The purpose of this function is to have a formik controlled input with the ability to select input unit type.
  The unit stored in formik will ALWAYS be stored in kg.
  The unit displayed in the input field will be converted to whichever unit is selected.
  On changing the input, the value is converted from the input text to kg and stored in formik.
*/

type WeightInputProps = TextInputProps & {
  name: string
  label?: string,
};

function WeightInput(props: WeightInputProps): JSX.Element {
  const [field, meta, util] = useField<number>(props.name);
  const [inputUnits, setInputUnits] = useState<WeightUnit>('lb');
  const [textInput, setTextInput] = useState<string>(kgNumberToText(field.value, inputUnits));
  const styles = useStyles();

  if (typeof field.value !== 'number' && typeof field.value !== 'undefined') {
    throw new Error(`WeightInput: Field "${props.name}" return a value of type ${typeof field.value}, but should be a number`);
  };

  function textToKgNumber(text: string): number {
    const valueAsNumber = parseFloat(text);

    if (isNaN(valueAsNumber)) {
      return 0;
    };

    switch (inputUnits) {
      case 'kg': return roundedKg(valueAsNumber);
      case 'lb': return lbsToKg(valueAsNumber);
      case 'oz': return ozToKg(valueAsNumber);
    };
  };

  function kgNumberToText(kg: number, targetUnit: WeightUnit): string {
    if (kg === 0) {
      return '';
    };

    switch (targetUnit) {
      case 'kg': return kg.toString();
      case 'lb': return kgToLbs(kg).toString();
      case 'oz': return kgToOz(kg).toString();
    };
  };

  function handleTextChange(inputText: string): void {
    setTextInput(inputText);

    const kgValue = textToKgNumber(inputText);
    util.setValue(kgValue);
  };

  function handleInputUnitChange(inputUnit: string): void {
    setInputUnits(inputUnit as WeightUnit);

    // with new input unit, convert the stored number value(in kg) to the target unit as a string
    const convertedTextValue = kgNumberToText(field.value, inputUnit as WeightUnit);
    setTextInput(convertedTextValue);
  };

  return (
    <View style={[styles.container, props.style]} >
      <View style={styles.inputContainer}>
        <PaperInput
          value={textInput}
          onChangeText={handleTextChange}
          error={Boolean(meta.touched && meta.error)}
          label={props.label || props.name}
          mode="outlined"
          keyboardType="numeric"
          right={<PaperInput.Affix text={inputUnits} />}
          style={styles.textInput}
          returnKeyType="done"
          {...props}
        />

        <ToggleButton.Row
          value={inputUnits}
          onValueChange={handleInputUnitChange}
          style={styles.unitSelector}
        >
          <ToggleButton icon={() => <ToggleButtonText label="oz" />} value="oz" />
          <ToggleButton icon={() => <ToggleButtonText label="lb" />} value="lb" />
          <ToggleButton icon={() => <ToggleButtonText label="kg" />} value="kg" />
        </ToggleButton.Row>

      </View>
      {
        meta.touched && meta.error &&
        <HelperText type="error">{meta.error}</HelperText>
      }
    </View>
  );
};

export default withTheme(WeightInput);