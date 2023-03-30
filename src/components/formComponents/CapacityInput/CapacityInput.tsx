import { useField } from 'formik';
import React, { useState } from 'react';
import { View } from 'react-native';
import { ToggleButton, TextInput, HelperText, TextInputProps, withTheme } from 'react-native-paper';

import useStyles from './CapacityInput.styles';
import { flOzToMl, mlToFlOz } from '../../../utils/liquidConversions/liquidConversions';
import { ToggleButtonText } from '../../ui';

type CapacityInputProps = TextInputProps & {
  name: string;
  label?: string;
};
function CapacityInput(props: CapacityInputProps): JSX.Element {
  const [field, meta, util] = useField<number>(props.name);
  const styles = useStyles();
  const [inputUnits, setInputUnits] = useState<LiquidCapacityUnit>('ml');
  const [textInput, setTextInput] = useState<string>(mlNumberToText(field.value, inputUnits));

  if (typeof field.value !== 'number' && typeof field.value !== 'undefined') {
    throw new Error(
      `CapacityInput: Field "${
        props.name
      }" return a value of type ${typeof field.value}, but should be a number`
    );
  }

  function textToMlNumber(text: string): number {
    // input text value ex: "10" while input unit is "oz"
    // output number in ml ex: 296 (which is 10flOz in ml)
    const valueAsNumber = parseFloat(text);

    if (isNaN(valueAsNumber)) {
      return 0;
    }

    switch (inputUnits) {
      case 'ml':
        return valueAsNumber;
      case 'oz':
        return flOzToMl(valueAsNumber);
    }
  }

  function mlNumberToText(ml: number, targetUnit: LiquidCapacityUnit): string {
    // input is number value in ml, and target unit ex: (10, 'oz') => this is an input of 10ml expected to be converted to fl oz
    // output ex: ".34" => .34 fl oz is equal to 10ml
    if (ml === 0) {
      return '';
    }

    switch (targetUnit) {
      case 'ml':
        return ml.toString();
      case 'oz':
        return mlToFlOz(ml).toString();
    }
  }

  function handleTextChange(inputText: string): void {
    setTextInput(inputText);

    const mlNumber = textToMlNumber(inputText);
    util.setValue(mlNumber);
  }

  function handleInputUnitChange(inputUnit: string): void {
    setInputUnits(inputUnit as LiquidCapacityUnit);

    // with new input unit, convert the stored number value(in ml) to the target unit as a string
    const convertedTextValue = mlNumberToText(field.value, inputUnit as LiquidCapacityUnit);
    setTextInput(convertedTextValue);
  }

  return (
    <>
      <View style={styles.container}>
        <TextInput
          mode="outlined"
          style={styles.input}
          value={textInput}
          onChangeText={handleTextChange}
          right={<TextInput.Affix text={inputUnits} />}
          keyboardType="numeric"
          returnKeyType="done"
          error={Boolean(meta.touched && meta.error)}
          {...props}
        />

        <ToggleButton.Row
          style={styles.toggleGroup}
          value={inputUnits}
          onValueChange={handleInputUnitChange}>
          <ToggleButton icon={() => <ToggleButtonText label="oz" />} value="oz" />
          <ToggleButton icon={() => <ToggleButtonText label="mL" />} value="ml" />
        </ToggleButton.Row>
      </View>

      {meta.touched && meta.error && <HelperText type="error">{meta.error}</HelperText>}
    </>
  );
}

export default withTheme(CapacityInput);
