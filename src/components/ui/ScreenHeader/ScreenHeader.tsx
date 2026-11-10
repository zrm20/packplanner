import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';

import useStyles from './ScreenHeader.styles';

interface ScreenHeaderProps {
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function ScreenHeader(props: ScreenHeaderProps): JSX.Element {
  const styles = useStyles();
  const { eyebrow, title, action, style } = props;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.text}>
        <Text variant="labelMedium" style={styles.eyebrow}>
          {eyebrow}
        </Text>
        <Text variant="headlineLarge" accessibilityRole="header">
          {title}
        </Text>
      </View>
      {action}
    </View>
  );
}
