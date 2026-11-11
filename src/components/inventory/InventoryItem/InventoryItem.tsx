import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native';
import { Text, Icon } from 'react-native-paper';

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
            <TouchableOpacity
              accessibilityLabel={`Add ${name} to pack`}
              onPress={addToPack}
              style={styles.addButton}>
              <Icon source="plus" size={16} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.textContainer}>
          <Text variant="titleSmall" numberOfLines={1} style={styles.name}>
            {name}
          </Text>
          {Boolean(brand) && (
            <Text variant="bodySmall" numberOfLines={1} style={styles.brand}>
              {brand}
            </Text>
          )}
        </View>
        <View style={styles.weightContainer}>
          <Text variant="labelLarge" style={styles.weight}>
            {getWeight()}
          </Text>
          {Boolean(liquidCapacity) && (
            <Text variant="labelSmall" style={styles.liquid}>
              {getLiquidCapacity()}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
