import React from "react";
import { Image, View } from "react-native";
import { Button, Text } from "react-native-paper";

import { SafeAreaScreen } from "../../ui";
import useStyles from "./SplashScreen.styles";
const logo = require("../../../../assets/packplannerlogo.png");

interface SplashScreenProps {

};

export default function SplashScreen(props: SplashScreenProps): JSX.Element {
  const styles = useStyles();

  function navToRegister(): void {
  };

  function navToLogin(): void {
  };

  function logInAnonymously(): void {

  };

  return (
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
          Sign In
        </Button>
        <Button onPress={logInAnonymously} mode="contained" style={styles.button}>
          Continue as Guest
        </Button>
      </View>
    </SafeAreaScreen>
  );
};
