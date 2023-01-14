import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { NavIconButton } from "../../ui";

import useStyles from "./MyPackToolbar.styles";

export default function MyPackToolbar(): JSX.Element {
  const styles = useStyles();

  const iconMode: React.ComponentProps<typeof IconButton>['mode'] = "outlined"

  return (
    <View style={styles.container} >
      <NavIconButton goBack icon="chart-pie" mode={iconMode} />
      <NavIconButton goBack icon="playlist-check" mode={iconMode} />
      <NavIconButton goBack icon="content-save" mode={iconMode} />
      <NavIconButton goBack icon="import" mode={iconMode} />
      <NavIconButton goBack icon="trash-can" mode={iconMode} />
    </View>
  );
};
