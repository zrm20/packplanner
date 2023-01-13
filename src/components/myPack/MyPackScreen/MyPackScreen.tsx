import React from "react";
import { Text } from "react-native-paper";

import useStyles from "./MyPackScreen.styles";
import { MyPackHomeScreenProps } from "../../../navigation/navigation.types";
import { SafeAreaScreen } from "../../ui";

export default function MyPackScreen(props: MyPackHomeScreenProps): JSX.Element {
  const styles = useStyles();

  return (
    <SafeAreaScreen style={styles.container} >
      <Text>MyPack Screen</Text>
    </SafeAreaScreen>
  );
};
