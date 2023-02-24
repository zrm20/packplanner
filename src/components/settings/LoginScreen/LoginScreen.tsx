import React from "react";
import { Text } from "react-native-paper";

import { SafeAreaScreen } from "../../ui";
import useStyles from "./LoginScreen.styles";

interface LoginScreenProps {

};

export default function LoginScreen(props: LoginScreenProps): JSX.Element {
  const styles = useStyles();

  return (
    <SafeAreaScreen style={styles.container}>
      <Text>Login Screen</Text>
    </SafeAreaScreen>
  );
};
