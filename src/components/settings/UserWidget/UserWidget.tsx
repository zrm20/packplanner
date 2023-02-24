import React from "react";
import { View, ViewStyle } from "react-native";
import { Surface, Text, Button } from "react-native-paper";

import useStyles from "./UserWidget.styles";

interface UserWidgetProps {
  style?: ViewStyle
};

export default function UserWidget(props: UserWidgetProps): JSX.Element {
  const styles = useStyles();

  return (
    <View style={[styles.container, props.style]} >
      <Surface style={styles.authSurface}>
        <Text variant="headlineSmall">User</Text>

        <View style={styles.buttonGroup}>
          <Button mode="contained">Register</Button>

          <Button mode="contained">Login</Button>
        </View>
      </Surface>
    </View>
  );
};
