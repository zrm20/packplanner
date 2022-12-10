import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { TextInput as PaperInput, HelperText, ToggleButton, Text } from "react-native-paper";
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

export default function WeightInput(props) {
  const [field, meta, util] = useField(props);
  const [inputUnits, setInputUnits] = useState('lb');
  const [textInput, setTextInput] = useState(null);
  const styles = useStyles();

  // this effect changes the stored formik value every time the text changes
  useEffect(() => {
    util.setValue(units[inputUnits].setValue(textInput))
  }, [textInput]);

  // this effect changes the text field value when the units are changed
  useEffect(() => {
    setTextInput(units[inputUnits].showValue(field.value))
  }, [inputUnits]);

  const units = {
    "oz": {
      showValue: value => value ? kgToOz(value).toString() : '',
      setValue: text => ozToKg(parseFloat(text))
    },
    "lb": {
      showValue: value => value ? kgToLbs(value).toString() : '',
      setValue: text => lbsToKg(parseFloat(text))
    },
    "kg": {
      showValue: value => value ? roundedKg(value).toString() : '',
      setValue: text => parseFloat(text)
    }
  };

  return (
    <View style={[styles.container, props.style]} >
      <View style={styles.inputContainer}>
        <PaperInput
          value={textInput}
          onChangeText={setTextInput}
          error={meta.touched && meta.error}
          label={props.label || props.name}
          mode="outlined"
          keyboardType="numeric"
          right={<PaperInput.Affix text={inputUnits} />}
          style={styles.textInput}
          {...props}
        />

        <ToggleButton.Row
          value={inputUnits}
          onValueChange={setInputUnits}
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
