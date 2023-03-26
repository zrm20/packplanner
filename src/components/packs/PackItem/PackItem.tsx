import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, Surface, Title, Subheading } from "react-native-paper";
import { usePackModel } from "../../../hooks";
import { useSelector } from "../../../redux/reduxHooks";

import useStyles from "./PackItem.styles";

interface PackItemProps {
  pack: PackData;
  disabled?: boolean;
};

export default function PackItem(props: PackItemProps): JSX.Element {
  const { pack, disabled = false } = props;
  const selectedPackId = useSelector(state => state.myPack.selectedPack);
  const packModel = usePackModel(pack);
  const styles = useStyles();

  const isSelected = pack.id === selectedPackId;

  return (
    <TouchableOpacity onLongPress={packModel.openEdit} onPress={packModel.select} disabled={disabled} >
      <Surface style={[styles.container, isSelected ? styles.selectedPack : null]} >
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
        <Text>{packModel.getWeight()}</Text>
      </Surface>
    </TouchableOpacity>
  );
};
