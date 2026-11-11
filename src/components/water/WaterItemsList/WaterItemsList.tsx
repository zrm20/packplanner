import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import useStyles from './WaterItemsList.styles';
import { useInventory, useSettings } from '../../../hooks';

export default function WaterItemsList(): JSX.Element {
  const styles = useStyles();
  const { inventory } = useInventory();
  const { liquidUnit } = useSettings();
  const items = inventory.filter(
    (item) => item.liquidCapacity && item.liquidCapacity > 0 && item.qty > 0
  );

  return (
    <View style={styles.container}>
      <Text variant="labelMedium" style={styles.title}>
        Containers in pack
      </Text>
      {items.length ? (
        items.map((item, index) => (
          <View key={item.id} style={[styles.row, index === 0 && styles.firstRow]}>
            <View style={styles.text}>
              <Text variant="titleSmall" numberOfLines={1} style={styles.name}>
                {item.qty}× {item.name}
              </Text>
              {Boolean(item.brand) && (
                <Text variant="bodySmall" numberOfLines={1} style={styles.brand}>
                  {item.brand}
                </Text>
              )}
            </View>
            <Text variant="labelLarge" style={styles.capacity}>
              {liquidUnit.convert(item.liquidCapacity!)} {liquidUnit.label}
            </Text>
          </View>
        ))
      ) : (
        <Text variant="bodyMedium" style={styles.empty}>
          No water containers in pack yet.
        </Text>
      )}
    </View>
  );
}
