import React from "react";
import { Text } from "react-native-paper";
import useUser from "../../../hooks/user/useUser";

import { LoadingBackdrop, SafeAreaScreen } from "../../ui";
import LoginForm from "../LoginForm/LoginForm";
import useStyles from "./LoginScreen.styles";

interface LoginScreenProps {

};

export default function LoginScreen(props: LoginScreenProps): JSX.Element {
  const styles = useStyles();
  const { isLoading } = useUser();

  return (
    <>
      <LoadingBackdrop show={isLoading} />
      <SafeAreaScreen style={styles.container}>
        <Text variant="displaySmall">Login</Text>
        <LoginForm style={styles.form} />
      </SafeAreaScreen>
    </>
  );
};
