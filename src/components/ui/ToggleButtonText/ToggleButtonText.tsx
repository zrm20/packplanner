import React from "react";
import { Avatar, AvatarTextProps, withTheme } from "react-native-paper";

function TextIcon({ label, size = 28, ...props }: AvatarTextProps): JSX.Element {
  return (
    <Avatar.Text
      label={label}
      size={size}
      {...props}
    />
  )
};

export default withTheme(TextIcon);
