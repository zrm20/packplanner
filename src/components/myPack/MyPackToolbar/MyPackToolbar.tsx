import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";

import useStyles from "./MyPackToolbar.styles";

export default function MyPackToolbar(): JSX.Element {
  const styles = useStyles();

  const iconMode: React.ComponentProps<typeof IconButton>['mode'] = "outlined"

  return (
    <View style={styles.container} >
      <IconButton icon="chart-pie" mode={iconMode} />
      <IconButton icon="playlist-check" mode={iconMode} />
      <IconButton icon="content-save" mode={iconMode} />
      <IconButton icon="import" mode={iconMode} />
      <IconButton icon="trash-can" mode={iconMode} />
    </View>
  );
};
