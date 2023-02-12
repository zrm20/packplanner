import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FAB } from "react-native-paper";

import { isAndroid } from "../../../utils";
import { ViewStyle } from "react-native";

interface CloseScreenButtonProps {
  position?: "left" | "right";
  androidOnly?: boolean;
  style?: ViewStyle;
};

export default function CloseScreenButton(props: CloseScreenButtonProps): JSX.Element | null {
  const { androidOnly = false, position = "left" } = props;
  const { goBack } = useNavigation();
  const deviceIsAndroid = isAndroid();

  if (!goBack) {
    throw new Error("goBack was not found in useNavigation context");
  };

  if (androidOnly && !deviceIsAndroid) {
    return null;
  };

  return (
    <FAB
      onPress={goBack}
      size="small"
      icon="close"
      {...props}
    />
  );
};
