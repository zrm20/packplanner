import { Picker, PickerProps } from '@react-native-picker/picker';
import { useField } from 'formik';
import React from 'react';
import { View, ViewProps } from 'react-native';
import { Text } from 'react-native-paper';

type PickerItem = {
  label: string;
  value: string;
};

interface PickerInputProps extends PickerProps {
  name: string;
  data: PickerItem[];
  style?: ViewProps;
  label?: string;
}

export default function PickerInput(props: PickerInputProps): JSX.Element {
  const { name, data, style, label, ...rest } = props;
  const [field, meta, utils] = useField<string>(name);

  if (!field) {
    throw new Error(`Could not find field with value${name}`);
  }

  function handleChange(newValue: string | number) {
    const parsedValue = String(newValue);

    utils.setValue(parsedValue);
  }

  return (
    <View style={[{ width: '100%' }, style]}>
      {label && (
        <Text variant="bodyLarge" style={{ textAlign: 'center' }}>
          {label}:
        </Text>
      )}
      <Picker selectedValue={field.value} onValueChange={handleChange} {...rest}>
        {data.map((item) => (
          <Picker.Item label={item.label} value={item.value} key={item.value} />
        ))}
      </Picker>
    </View>
  );
}
