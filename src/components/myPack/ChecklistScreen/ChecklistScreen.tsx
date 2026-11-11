import React, { useState } from 'react';
import { SectionList, View } from 'react-native';
import { Checkbox, List, ProgressBar, SegmentedButtons, Text } from 'react-native-paper';

import useStyles from './ChecklistScreen.styles';
import { useCategories, useInventory, useItemModel } from '../../../hooks';
import { ContainedModalTitle, SafeAreaScreen } from '../../ui';

function ChecklistItem(props: { item: Item }): JSX.Element {
  const item = useItemModel(props.item);
  const styles = useStyles();
  return (
    <List.Item
      style={styles.item}
      title={item.name}
      titleNumberOfLines={3}
      description={item.brand || undefined}
      descriptionNumberOfLines={2}
      left={() => (
        <Checkbox.Android
          accessibilityLabel={`Pack ${item.name}`}
          status={item.isPacked ? 'checked' : 'unchecked'}
          onPress={item.toggleIsPacked}
        />
      )}
      right={() => <Text style={styles.quantity}>×{item.qty}</Text>}
    />
  );
}

export default function ChecklistScreen(): JSX.Element {
  const styles = useStyles();
  const { itemsInPack } = useInventory();
  const { categories, miscCategory } = useCategories();
  const [filter, setFilter] = useState('All');
  const total = itemsInPack.length;
  const packed = itemsInPack.filter((item) => item.isPacked).length;
  const shown = itemsInPack.filter((item) =>
    filter === 'All' ? true : filter === 'Packed' ? item.isPacked : !item.isPacked
  );
  const sections = categories
    .map((category) => ({
      title: category.label,
      data: shown.filter(
        (item) =>
          (categories.some((cat) => cat.id === item.category) ? item.category : miscCategory.id) ===
          category.id
      ),
    }))
    .filter((section) => section.data.length > 0);

  return (
    <SafeAreaScreen>
      <ContainedModalTitle title="Trip checklist" />
      <SectionList
        style={styles.list}
        contentContainerStyle={styles.content}
        sections={sections}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={
          <>
            <View style={styles.progress}>
              <Text variant="labelMedium" style={styles.eyebrow}>
                Ready for the trail
              </Text>
              <Text variant="headlineMedium">
                {packed} of {total} packed
              </Text>
              <ProgressBar progress={total ? packed / total : 0} style={styles.bar} />
            </View>
            <SegmentedButtons
              value={filter}
              onValueChange={setFilter}
              buttons={['All', 'Remaining', 'Packed'].map((value) => ({ value, label: value }))}
              style={styles.filters}
            />
          </>
        }
        renderSectionHeader={({ section }) => (
          <Text variant="titleMedium" style={styles.section}>
            {section.title} · {section.data.length}
          </Text>
        )}
        renderItem={({ item }) => <ChecklistItem item={item} />}
        ListEmptyComponent={
          <Text style={styles.empty}>
            {!total
              ? 'No gear to check off. Add items to My Pack before preparing for your trip.'
              : filter === 'Remaining'
              ? 'Everything is packed. Happy trails.'
              : 'Nothing packed yet.'}
          </Text>
        }
      />
    </SafeAreaScreen>
  );
}
