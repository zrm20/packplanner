import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, Icon, Surface } from 'react-native-paper';

import useStyles from './PackItem.styles';
import { usePackModel } from '../../../hooks';
import { useSelector } from '../../../redux/reduxHooks';

interface PackItemProps {
  pack: PackData;
  disabled?: boolean;
}

export default function PackItem(props: PackItemProps): JSX.Element {
  const { pack, disabled = false } = props;
  const selectedPackId = useSelector((state) => state.myPack.selectedPack);
  const packModel = usePackModel(pack);
  const styles = useStyles();

  const isSelected = pack.id === selectedPackId;

  return (
    <TouchableOpacity
      onLongPress={packModel.openEdit}
      onPress={packModel.select}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      accessibilityLabel={`${pack.brand} ${pack.model}`}>
      <Surface style={[styles.container, isSelected ? styles.selectedPack : styles.unselectedPack]}>
        <View style={[styles.iconTile, isSelected ? styles.selectedIconTile : null]}>
          <Icon
            source="bag-personal"
            size={20}
            color={
              (isSelected ? styles.selectedIcon.color : styles.icon.color) as string
            }
          />
        </View>
        {isSelected ? (
          <View style={styles.check}>
            <Icon source="check-circle" size={20} color={styles.checkIcon.color as string} />
          </View>
        ) : null}
        <Text variant="titleMedium" style={styles.brand} numberOfLines={2}>
          {pack.brand}
        </Text>
        <Text variant="bodySmall" style={styles.model} numberOfLines={1}>
          {pack.model}
        </Text>
        <Text variant="labelSmall" style={styles.meta} numberOfLines={1}>
          {pack.capacity} L · {packModel.getWeight()}
        </Text>
      </Surface>
    </TouchableOpacity>
  );
}
