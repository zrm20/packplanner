import { Picker, PickerProps } from '@react-native-picker/picker';
import { useField } from 'formik';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';

import { useTheme } from '../../../theme';

type PickerItem = {
  label: string;
  value: string;
};

interface PickerInputProps extends PickerProps<string> {
  name: string;
  data: PickerItem[];
  style?: StyleProp<ViewStyle>;
  label?: string;
}

export default function PickerInput(props: PickerInputProps): JSX.Element {
  const { name, data, style, label, ...rest } = props;
  const { colors, space, roundness, fonts } = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, utils] = useField<string>(name);

  if (!field) {
    throw new Error(`Could not find field with value${name}`);
  }

  function handleChange(newValue: string) {
    utils.setValue(newValue);
  }

  return (
    <View style={[{ width: '100%', paddingHorizontal: space[3], marginBottom: space[2] }, style]}>
      {label && (
        <Text
          variant="labelMedium"
          style={{ color: colors.onSurfaceVariant, marginBottom: space[1] }}>
          {label}
        </Text>
      )}
      <Picker
        accessibilityLabel={label}
        style={{
          color: colors.onSurface,
          backgroundColor: colors.surface,
          borderColor: colors.outline,
          borderWidth: 1,
          borderRadius: roundness,
          ...fonts.bodyLarge,
        }}
        selectedValue={field.value}
        onValueChange={handleChange}
        {...rest}>
        {data.map((item) => (
          <Picker.Item label={item.label} value={item.value} key={item.value} />
        ))}
      </Picker>
    </View>
  );
}
