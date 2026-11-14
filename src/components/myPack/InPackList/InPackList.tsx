import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';

import useStyles from './InPackList.styles';
import { useInventory } from '../../../hooks';
import { CategorizedItemList } from '../../inventory';

interface InPackListProps extends React.PropsWithChildren {
  style?: ViewStyle;
}

export default function InPackList(props: InPackListProps): JSX.Element {
  const styles = useStyles();
  const { itemsInPack } = useInventory();

  return (
    <View style={[styles.container, props.style]}>
      <CategorizedItemList
        data={itemsInPack}
        itemProps={{ disabled: true }}
        ListHeaderComponent={
          <>
            {props.children}
            <View style={styles.toolbar}>
              <Text variant="headlineSmall">In my pack</Text>
              <Text variant="labelMedium" style={styles.meta}>
                {itemsInPack.length} {itemsInPack.length === 1 ? 'item' : 'items'}
              </Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <Text variant="titleMedium" style={styles.emptyText}>
            No Items in Pack
          </Text>
        }
      />
    </View>
  );
}
