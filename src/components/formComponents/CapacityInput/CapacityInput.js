import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ToggleButton, TextInput, Text, HelperText } from "react-native-paper";
import { useField } from "formik";

import { ToggleButtonText } from "../../ui";
import useStyles from "./CapacityInput.styles";
import { flOzToML, mLToFlOz } from "../../../utils/liquidConversions/liquidConversions";

export default function CapacityInput(props) {
  const styles = useStyles();
  const [inputUnits, setInputUnits] = useState('mL');
  const [textInput, setTextInput] = useState('');
  const [field, meta, helpers] = useField(props);

  useEffect(() => {
    helpers.setValue(unitsMap[inputUnits].toNum(textInput));
  }, [textInput]);

  useEffect(() => {
    setTextInput(unitsMap[inputUnits].toText(field.value));
  }, [inputUnits]);

  const unitsMap = {
    "oz": {
      toNum: text => flOzToML(parseFloat(text)),
      toText: value => mLToFlOz(value).toString()
    },
    "mL": {
      toNum: text => parseFloat(text),
      toText: value => value.toString()
    }
  };

  return (
    <>
      <View style={styles.container} >
        <TextInput
          mode="outlined"
          style={styles.input}
          value={textInput}
          onChangeText={setTextInput}
          right={<TextInput.Affix text={inputUnits} />}
          keyboardType="numeric"
          error={meta.touched && meta.error}
          {...props}
        />

        <ToggleButton.Row
          style={styles.toggleGroup}
          value={inputUnits}
          onValueChange={setInputUnits}
        >
          <ToggleButton icon={() => <ToggleButtonText label='oz' />} value="oz" />
          <ToggleButton icon={() => <ToggleButtonText label='mL' />} value="mL" />
        </ToggleButton.Row>
      </View>

      {
        meta.touched && meta.error &&
        <HelperText type="error">{meta.error}</HelperText>
      }
    </>
  );
};
