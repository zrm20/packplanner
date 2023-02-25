import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import useStyles from "./LoadingBackdrop.styles";

interface LoadingBackdropProps {
  show: boolean
};

export default function LoadingBackdrop(props: LoadingBackdropProps): JSX.Element {
  const styles = useStyles(props.show);

  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
};
