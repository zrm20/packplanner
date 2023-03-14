import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Image, View } from "react-native";
import { Button, Text } from "react-native-paper";
import useUser from "../../../hooks/user/useUser";
import { AuthStackParamList } from "../../../navigation/navigation.types";

import { LoadingBackdrop, SafeAreaScreen } from "../../ui";
import useStyles from "./SplashScreen.styles";
const logo = require("../../../../assets/packplannerlogo.png");

type SplashScreenProps = NativeStackScreenProps<AuthStackParamList, "Splash">;

export default function SplashScreen(props: SplashScreenProps): JSX.Element {
  const styles = useStyles();
  const { navigation } = props;
  const { loginAsGuest, isLoading } = useUser();

  function navToRegister(): void {
    navigation.navigate("Register");
  };

  function navToLogin(): void {
    navigation.navigate("Login");
  };

  return (
    <>
      <LoadingBackdrop show={isLoading} style={styles.backdrop} />
      <SafeAreaScreen style={styles.container} >
        <Text variant="displaySmall" style={styles.title}>Trail Pack Pro</Text>
        <Image source={logo} style={styles.image} />

        <Text variant="titleMedium" style={styles.subtitle}>
          Please choose a sign in method.
        </Text>
        <Text style={styles.bodyText}>
          Your account is used to save your gear inventory and saved lists to the cloud.
          You may choose to continue as a guest and create an account at a later time.
        </Text>

        <View>
          <Button onPress={navToRegister} mode="contained" style={styles.button}>
            Register
          </Button>
          <Button onPress={navToLogin} mode="contained" style={styles.button}>
            Login
          </Button>
          <Button onPress={loginAsGuest} mode="contained" style={styles.button}>
            Continue as Guest
          </Button>
        </View>
      </SafeAreaScreen>
    </>
  );
};
