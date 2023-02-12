import React from "react";
import { Text } from "react-native-paper";

import { SafeAreaScreen } from "../../ui";
import useStyles from "./ChartScreen.styles";

export default function ChartScreen(): JSX.Element {
  const styles = useStyles();

  return (
    <SafeAreaScreen style={styles.container} >
      <Text variant="headlineLarge" style={styles.title}>Weight by Category</Text>
    </SafeAreaScreen>
  );
};
