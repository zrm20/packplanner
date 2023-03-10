import React, { useState } from "react";

import useStyles from "./MyPackScreen.styles";
import { MyPackHomeScreenProps } from "../../../navigation/navigation.types";
import { SafeAreaScreen } from "../../ui";
import MyPackHeader from "../MyPackHeader/MyPackHeader";
import InPackList from "../InPackList/InPackList";
import MyPackToolbar from "../MyPackToolbar/MyPackToolbar";
import MyPackStatsBar from "../MyPackStatsBar/MyPackStatsBar";
import { Portal } from "react-native-paper";
import { NewListModal } from "../../lists";

export default function MyPackScreen(props: MyPackHomeScreenProps): JSX.Element {
  const styles = useStyles();
  const [showNewListModal, setShowNewListModal] = useState<boolean>(false);

  function toggleNewListModal(): void {
    setShowNewListModal(!showNewListModal);
  };

  return (
    <Portal.Host>
      <SafeAreaScreen style={styles.container} >
        <MyPackHeader style={styles.header} />
        <MyPackStatsBar style={styles.stats} />
        <MyPackToolbar
          style={styles.toolbar}
          toggleNewListModal={toggleNewListModal}
        />
        <InPackList />
      </SafeAreaScreen>
      <NewListModal
        visible={showNewListModal}
        toggleVisibility={toggleNewListModal}
      />
    </Portal.Host>
  );
};
