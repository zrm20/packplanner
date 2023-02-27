import React from "react";
import { Text } from "react-native-paper";
import useUser from "../../../hooks/user/useUser";

import { SafeAreaScreen } from "../../ui";
import LoadingBackdrop from "../../ui/LoadingBackdrop/LoadingBackdrop";
import RegisterForm from "../RegisterForm/RegisterForm";
import useStyles from "./RegisterScreen.styles";

interface RegisterScreenProps {

};

export default function RegisterScreen(props: RegisterScreenProps): JSX.Element {
  const styles = useStyles();
  const { isLoading } = useUser();

  return (
    <>
      <LoadingBackdrop show={isLoading} />
      <SafeAreaScreen style={styles.container}>
        <Text style={styles.title} variant="displaySmall">
          Register
        </Text>

        <RegisterForm style={styles.form} />
      </SafeAreaScreen>
    </>
  );
};
