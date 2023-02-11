import React from "react";
import { View } from "react-native";

import useStyles from "./ChecklistScreen.styles";

interface ChecklistScreenProps {

};

export default function ChecklistScreen(props: ChecklistScreenProps): JSX.Element {
  const styles = useStyles();

  return (
    <View style={styles.container} >

    </View>
  );
};
