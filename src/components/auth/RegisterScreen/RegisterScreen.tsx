import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Text } from "react-native-paper";

import useUser from "../../../hooks/user/useUser";
import { AuthStackParamList } from "../../../navigation/navigation.types";
import { SafeAreaScreen } from "../../ui";
import LoadingBackdrop from "../../ui/LoadingBackdrop/LoadingBackdrop";
import RegisterForm from "../RegisterForm/RegisterForm";
import useStyles from "./RegisterScreen.styles";

type RegisterScreenProps = NativeStackScreenProps<AuthStackParamList, "Register">;

export default function RegisterScreen(props: RegisterScreenProps): JSX.Element {
  const styles = useStyles();
  const { isLoading } = useUser();
  const { goBack } = props.navigation

  return (
    <>
      <LoadingBackdrop show={isLoading} />
      <SafeAreaScreen style={styles.container}>
        <Text style={styles.title} variant="displaySmall">
          Register
        </Text>

        <RegisterForm style={styles.form} />
        <Button mode="contained" onPress={goBack}>Back</Button>
      </SafeAreaScreen>
    </>
  );
};
