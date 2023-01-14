import React from "react";
import { Text } from "react-native-paper";

import useStyles from "./MyPackScreen.styles";
import { MyPackHomeScreenProps } from "../../../navigation/navigation.types";
import { SafeAreaScreen } from "../../ui";
import MyPackHeader from "../MyPackHeader/MyPackHeader";

export default function MyPackScreen(props: MyPackHomeScreenProps): JSX.Element {
  const styles = useStyles();

  return (
    <SafeAreaScreen style={styles.container} >
      <MyPackHeader />
    </SafeAreaScreen>
  );
};
