import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import React from "react";
import { View, ViewStyle } from "react-native";
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
            <Button mode="contained" onPress={logout}>Logout</Button>
          </View>
        </Surface>
      </View>
    </>
  );
};
