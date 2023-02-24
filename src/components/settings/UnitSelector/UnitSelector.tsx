import React from "react";
import { View, ViewStyle } from "react-native";
import { Text, SegmentedButtons } from "react-native-paper";

import useStyles from "./UnitSelector.styles";

type ButtonValue = {
  value: string;
  label: string;
};

interface UnitSelectorProps {
  style?: ViewStyle;
  label: string;
  value: string;
  onChange(value: string): void;
  buttons: ButtonValue[]
};

export default function UnitSelector(props: UnitSelectorProps): JSX.Element {
  const styles = useStyles();

  return (
    <View style={[styles.container, props.style]}>
      <Text variant="titleMedium">{props.label}</Text>
      <SegmentedButtons
        value={props.value}
        onValueChange={props.onChange}
        buttons={props.buttons}
      />
    </View>
  );
};
