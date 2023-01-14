import React from "react";
import { Text } from "react-native-paper";

import useStyles from "./MyPackScreen.styles";
import { MyPackHomeScreenProps } from "../../../navigation/navigation.types";
import { SafeAreaScreen } from "../../ui";
import MyPackHeader from "../MyPackHeader/MyPackHeader";
import InPackList from "../InPackList/InPackList";
import MyPackToolbar from "../MyPackToolbar/MyPackToolbar";

export default function MyPackScreen(props: MyPackHomeScreenProps): JSX.Element {
  const styles = useStyles();

  return (
    <SafeAreaScreen style={styles.container} >
      <MyPackHeader />
      <MyPackToolbar />
      <InPackList />
    </SafeAreaScreen>
  );
};
