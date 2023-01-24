import React from "react";

import useStyles from "./MyPackScreen.styles";
import { MyPackHomeScreenProps } from "../../../navigation/navigation.types";
import { SafeAreaScreen } from "../../ui";
import MyPackHeader from "../MyPackHeader/MyPackHeader";
import InPackList from "../InPackList/InPackList";
import MyPackToolbar from "../MyPackToolbar/MyPackToolbar";
import MyPackStatsBar from "../MyPackStatsBar/MyPackStatsBar";

export default function MyPackScreen(props: MyPackHomeScreenProps): JSX.Element {
  const styles = useStyles();

  return (
    <SafeAreaScreen style={styles.container} >
      <MyPackHeader style={styles.header} />
      <MyPackStatsBar style={styles.stats} />
      <MyPackToolbar style={styles.toolbar} />
      <InPackList />
    </SafeAreaScreen>
  );
};
