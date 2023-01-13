import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, Surface, Title, Subheading } from "react-native-paper";

import useStyles from "./PackItem.styles";

interface PackItemProps {
  pack: Pack
};

export default function PackItem(props: PackItemProps): JSX.Element {
  const { pack } = props;
  const styles = useStyles();

  return (
    <TouchableOpacity onLongPress={pack.openEdit} onPress={pack.select} >
      <Surface style={[styles.container, pack.isSelected ? styles.selectedPack : null]} >
        <Title
          style={styles.title}
          adjustsFontSizeToFit
          numberOfLines={2}
        >
          {pack.brand}
        </Title>
        <Subheading
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          {pack.model}
        </Subheading>
        <Text>{pack.weight}</Text>
      </Surface>
    </TouchableOpacity>
  );
};
