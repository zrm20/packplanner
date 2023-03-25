import React from "react";
import { ViewStyle, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import useStyles from "./LoadingBackdrop.styles";

interface LoadingBackdropProps {
  show: boolean;
  style?: ViewStyle;
  spinnerColor?: string;
};

export default function LoadingBackdrop(props: LoadingBackdropProps): JSX.Element {
  const styles = useStyles(props.show);

  return (
    <View style={[styles.container, props.style]}>
      <ActivityIndicator color={props.spinnerColor} />
    </View>
  );
};
