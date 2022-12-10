import React from "react";
import { Avatar } from "react-native-paper";

export default function TextIcon({ label, size = 28, ...props }) {
  return (
    <Avatar.Text
      label={label}
      size={size}
      {...props}
    />
  )
};
