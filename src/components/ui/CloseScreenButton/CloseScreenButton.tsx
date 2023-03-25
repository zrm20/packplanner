import React from "react";
import { useNavigation } from "@react-navigation/native";
import { IconButton, IconButtonProps } from "react-native-paper";

import { isAndroid } from "../../../utils";
import { ViewStyle } from "react-native";

export interface CloseScreenButtonProps extends Partial<IconButtonProps> {
  icon?: "close" | "chevron-down" | "arrow-left-bold"
  androidOnly?: boolean;
  style?: ViewStyle;
};

export default function CloseScreenButton(props: CloseScreenButtonProps): JSX.Element | null {
  const { androidOnly = false, icon = "close" } = props;
  const { goBack } = useNavigation();
  const deviceIsAndroid = isAndroid();

  if (!goBack) {
    throw new Error("goBack was not found in useNavigation context");
  };

  if (androidOnly && !deviceIsAndroid) {
    return null;
  };

  return (
    <IconButton
      onPress={goBack}
      icon={icon}
      mode="outlined"
      {...props}
    />
  );
};
