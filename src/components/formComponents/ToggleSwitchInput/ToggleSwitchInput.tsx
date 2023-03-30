import { useField } from 'formik';
import React from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import { Switch, Text } from 'react-native-paper';

import useStyles from './ToggleSwitchInput.styles';

interface ToggleSwitchInputProps {
  name: string;
  label?: string;
  row?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  switchStyle?: ViewStyle;
}

export default function ToggleSwitchInput(props: ToggleSwitchInputProps): JSX.Element {
  const { row = true } = props;
  const styles = useStyles(row);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, util] = useField<boolean>(props.name);

  function handleToggle(newValue: boolean) {
    util.setValue(newValue);
  }

  return (
    <View style={[styles.container, props.style]}>
      <Text variant="labelMedium" style={[styles.label, props.labelStyle]}>
        {props.label || props.name}
      </Text>
      <Switch
        value={field.value}
        onValueChange={handleToggle}
        style={[styles.switch, props.switchStyle]}
      />
    </View>
  );
}
