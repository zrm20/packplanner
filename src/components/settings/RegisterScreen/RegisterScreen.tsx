import React from "react";
import { Text } from "react-native-paper";

import { SafeAreaScreen } from "../../ui";
import useStyles from "./RegisterScreen.styles";

interface RegisterScreenProps {

};

export default function RegisterScreen(props: RegisterScreenProps): JSX.Element {
  const styles = useStyles();

  return (
    <SafeAreaScreen style={styles.container}>
      <Text>Register Screen</Text>
    </SafeAreaScreen>
  );
};
