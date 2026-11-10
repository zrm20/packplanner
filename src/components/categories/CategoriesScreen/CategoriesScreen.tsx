import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Icon, IconButton, Surface, Text } from 'react-native-paper';

import useStyles from './CategoriesScreen.styles';
import { chartColors } from '../../../constants';
import { useCategories } from '../../../hooks';
import { CategoriesStackParamList } from '../../../navigation/navigation.types';
import { SafeAreaScreen, ScreenHeader } from '../../ui';

type CategoriesScreenProps = NativeStackScreenProps<CategoriesStackParamList, 'CategoriesHome'>;

function CategoryRow(props: {
  category: Category;
  color: string;
  first: boolean;
  onPress?: () => void;
}): JSX.Element {
  const styles = useStyles();
  const { category, color, first, onPress } = props;

  const row = (
    <View style={[styles.row, first && styles.firstRow]}>
      <View style={[styles.icon, { backgroundColor: color }]}>
        <Icon source={category.icon} size={17} color={styles.iconGlyph.color as string} />
      </View>
      <View style={styles.text}>
        <Text variant="titleSmall" numberOfLines={1} style={styles.name}>
          {category.label}
        </Text>
        {category.isBaseWeightExempt && (
          <Text variant="bodySmall" style={styles.exempt}>
            Excluded from base weight
          </Text>
        )}
      </View>
      {category.isStockCategory ? (
        <View style={styles.stock}>
          <Text variant="labelSmall" style={styles.stockLabel}>
            Stock
          </Text>
        </View>
      ) : (
        <Icon source="chevron-right" size={20} color={styles.chevron.color as string} />
      )}
    </View>
  );

  if (!onPress) {
    return row;
  }

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`Edit ${category.label}`}
      onPress={onPress}>
      {row}
    </TouchableOpacity>
  );
}

export default function CategoriesScreen(props: CategoriesScreenProps): JSX.Element {
  const styles = useStyles();
  const { categories, categoriesSlice } = useCategories();
  const { navigation } = props;

  function navToNewCategory() {
    navigation.navigate('NewCategory');
  }

  return (
    <SafeAreaScreen style={styles.screen}>
      <ScreenHeader eyebrow="Organize" title="Categories" />
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <Text variant="headlineSmall">All categories</Text>
          <IconButton
            accessibilityLabel="Add category"
            icon="plus"
            size={16}
            mode="outlined"
            style={styles.addButton}
            onPress={navToNewCategory}
          />
        </View>
        <Surface style={styles.card} elevation={0}>
          {categoriesSlice.isLoading ? (
            <ActivityIndicator style={styles.spinner} />
          ) : (
            <FlatList
              style={styles.list}
              data={categories}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <CategoryRow
                  category={item}
                  color={chartColors[index % chartColors.length]}
                  first={index === 0}
                  onPress={
                    !item.isStockCategory
                      ? () => navigation.navigate('EditCategory', { categoryId: item.id })
                      : undefined
                  }
                />
              )}
            />
          )}
        </Surface>
      </View>
    </SafeAreaScreen>
  );
}
