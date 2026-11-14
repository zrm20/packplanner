import React, { useMemo } from 'react';
import { FlatList, FlatListProps, View } from 'react-native';
import { Icon, Surface, Text } from 'react-native-paper';

import useStyles from './CategorizedItemList.styles';
import { chartColors } from '../../../constants';
import { useSelector } from '../../../redux/reduxHooks';
import InventoryItem from '../InventoryItem/InventoryItem';

interface CategorizedItemListProps
  extends Pick<FlatListProps<CategoryGroup>, 'ListHeaderComponent' | 'ListEmptyComponent'> {
  data: Item[];
  itemProps?: {
    disabled?: boolean;
  };
}

interface CategoryGroup {
  categoryId: string;
  items: Item[];
}

function CategoryHeader(props: {
  id: string;
  itemCount: number;
  color: string;
}): JSX.Element {
  const styles = useStyles();
  const category = useSelector((state) =>
    state.categories.categories.find((c) => c.id === props.id)
  );

  // Inventory and custom categories arrive in independent Firestore snapshots.
  // A category may also have been deleted while an item still references it.
  const label = category?.label ?? 'Misc';
  const icon = category?.icon ?? 'chart-bubble';

  return (
    <View style={styles.catHeader}>
      <View style={[styles.catIcon, { backgroundColor: props.color }]}>
        <Icon source={icon} size={13} color={styles.catIconGlyph.color as string} />
      </View>
      <Text variant="labelMedium" style={styles.catLabel}>
        {label}
      </Text>
      <Text variant="labelMedium" style={styles.catMeta}>
        {props.itemCount} {props.itemCount === 1 ? 'item' : 'items'}
      </Text>
    </View>
  );
}

function groupByCategory(data: Item[]): CategoryGroup[] {
  const sorted = [...data].sort((a, b) => {
    if (a.category < b.category) {
      return -1;
    }
    if (a.category > b.category) {
      return 1;
    }
    return 0;
  });

  const groups: CategoryGroup[] = [];
  for (const item of sorted) {
    const last = groups[groups.length - 1];
    if (last && last.categoryId === item.category) {
      last.items.push(item);
    } else {
      groups.push({ categoryId: item.category, items: [item] });
    }
  }
  return groups;
}

export default function CategorizedItemList(props: CategorizedItemListProps): JSX.Element {
  const styles = useStyles();
  const categories = useSelector((state) => state.categories.categories);
  const groups = useMemo(() => groupByCategory(props.data), [props.data]);

  function colorForCategory(categoryId: string): string {
    const index = categories.findIndex((category) => category.id === categoryId);
    const paletteIndex = index >= 0 ? index : 0;
    return chartColors[paletteIndex % chartColors.length];
  }

  return (
    <FlatList
      style={styles.list}
      keyExtractor={(group) => group.categoryId}
      renderItem={({ item: group, index }) => (
        <View style={[styles.group, index === 0 ? undefined : styles.groupSpacing]}>
          <CategoryHeader
            id={group.categoryId}
            itemCount={group.items.length}
            color={colorForCategory(group.categoryId)}
          />
          <Surface style={styles.card} elevation={0}>
            {group.items.map((item, itemIndex) => (
              <InventoryItem
                key={item.id}
                item={item}
                openOnPress
                disabled={props.itemProps?.disabled}
                style={itemIndex === 0 ? styles.firstRowNoBorder : undefined}
              />
            ))}
          </Surface>
        </View>
      )}
      {...props}
      data={groups}
    />
  );
}
