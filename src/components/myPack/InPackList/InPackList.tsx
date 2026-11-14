import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';

import useStyles from './InPackList.styles';
import { useInventory } from '../../../hooks';
import { CategorizedItemList } from '../../inventory';
import { ListHeaderSection } from '../../inventory/CategorizedItemList/CategorizedItemList';

interface InPackListProps {
  style?: ViewStyle;
  headerSections?: ListHeaderSection[];
}

export default function InPackList(props: InPackListProps): JSX.Element {
  const styles = useStyles();
  const { itemsInPack } = useInventory();

  return (
    <View style={[styles.container, props.style]}>
      <CategorizedItemList
        data={itemsInPack}
        itemProps={{ openOnPress: false }}
        headerSections={[
          ...(props.headerSections ?? []),
          {
            key: 'item-count',
            element: (
              <View style={styles.toolbar}>
                <Text variant="headlineSmall">In my pack</Text>
                <Text variant="labelMedium" style={styles.meta}>
                  {itemsInPack.length} {itemsInPack.length === 1 ? 'item' : 'items'}
                </Text>
              </View>
            ),
          },
        ]}
        ListEmptyComponent={
          <Text variant="titleMedium" style={styles.emptyText}>
            No Items in Pack
          </Text>
        }
      />
    </View>
  );
}
