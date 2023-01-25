import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, Surface, Title, Subheading } from "react-native-paper";

import useStyles from "./PackItem.styles";

interface PackItemProps {
  pack: Pack;
  disabled?: boolean;
};

export default function PackItem(props: PackItemProps): JSX.Element {
  const { pack, disabled = false } = props;
  const styles = useStyles();

  return (
    <TouchableOpacity onLongPress={pack.openEdit} onPress={pack.select} disabled={disabled} >
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
        <Text>{pack.getWeight()}</Text>
      </Surface>
    </TouchableOpacity>
  );
};
