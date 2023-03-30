import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native';
import { Text, IconButton } from 'react-native-paper';

import useStyles from './InventoryItem.styles';
import { useItemModel } from '../../../hooks';
import QtyChanger from '../QtyChanger/QtyChanger';

interface InventoryItemProps extends TouchableOpacityProps {
  item: Item;
  style?: ViewStyle;
  openOnPress?: boolean;
}

export default function InventoryItem({ item, ...props }: InventoryItemProps): JSX.Element {
  const styles = useStyles();
  const itemModel = useItemModel(item);

  const {
    name,
    brand,
    liquidCapacity,
    category,
    qty,
    getWeight,
    getLiquidCapacity,
    addToPack,
    openEdit,
  } = itemModel;

  return (
    <TouchableOpacity {...props} onPress={props.openOnPress ? openEdit : undefined}>
      <View style={[styles.container, props.style]}>
        <View style={styles.leftContainer}>
          {qty > 0 ? (
            <QtyChanger item={itemModel} />
          ) : (
            <IconButton icon="plus" mode="outlined" onPress={addToPack} />
          )}
        </View>
        <View style={styles.textContainer}>
          {Boolean(category) && <Text variant="labelSmall">{category.label}</Text>}
          <Text variant="titleMedium" numberOfLines={1}>
            {brand}
          </Text>
          <Text variant="titleSmall" numberOfLines={1}>
            {name}
          </Text>
        </View>
        <View style={styles.weightContainer}>
          <Text variant="labelSmall">{getWeight()}</Text>
          {Boolean(liquidCapacity) && <Text variant="labelSmall">{getLiquidCapacity()}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
}
