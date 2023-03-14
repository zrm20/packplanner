import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, ViewStyle, Alert } from "react-native";
import { Surface, Text, Button } from "react-native-paper";
import useUser from "../../../hooks/user/useUser";
import { LoadingBackdrop } from "../../ui";

import useStyles from "./UserWidget.styles";

interface UserWidgetProps {
  style?: ViewStyle
};

export default function UserWidget(props: UserWidgetProps): JSX.Element {
  const styles = useStyles();
  const { navigate } = useNavigation();
  const { user, logout, isLoading } = useUser();

  function handleGuestLogout(): void {
    Alert.alert(
      "Warning, you will lose your data!",
      "You are about to log out as a guest. All of your data including inventory, packs and lists will be lost.\n\nYou can register for an account to save your data online. Do you want to continue logging out?",
      [
        {
          text: "Yes, erase my data and log out",
          style: "destructive",
          onPress: logout
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ]
    )
  };

  return (
    <>
      <LoadingBackdrop show={isLoading} />
      <View style={[styles.container, props.style]} >
        <Surface style={styles.authSurface}>
          <Text variant="headlineSmall">User</Text>
          <Text style={styles.helperText}>
            {
              "email" in user! ?
                user.email : "Guest"
            }
          </Text>

          <View style={styles.buttonGroup}>
            {
              "email" in user! ?
                <Button mode="contained" onPress={logout}>Logout</Button> :
                <>
                  <Button mode="contained">Register</Button>
                  <Button mode="contained">Login</Button>
                  <Button mode="contained" onPress={handleGuestLogout}>Logout</Button>
                </>
            }
          </View>
        </Surface>
      </View>
    </>
  );
};
