import React from 'react';
import { FlatList, View } from 'react-native';
import { Checkbox, Divider, List, Text } from 'react-native-paper';

import useStyles from './ChecklistScreen.styles';
import { useInventory, useItemModel } from '../../../hooks';
import { useTheme } from '../../../theme';
import { ContainedModalTitle, SafeAreaScreen } from '../../ui';

export default function ChecklistScreen(): JSX.Element {
  const styles = useStyles();
  const { colors } = useTheme();
  const { itemsInPack } = useInventory();

  const items = itemsInPack.map((item) => useItemModel(item));

  items.sort((a, b) => {
    return a.isPacked ? 1 : -1; // sort unpacked items to end
  });

  const totalItems = items.length;
  const packedItems = items.filter((item) => item.isPacked).length;

  return (
    <SafeAreaScreen style={styles.container}>
      <ContainedModalTitle title="✅ Trip Checklist" />
      <Text
        variant="labelLarge"
        style={styles.title}>{`${packedItems} of ${totalItems} packed`}</Text>

      <View style={styles.listContainer}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <>
              <List.Item
                title={`(${item.qty}) ${item.name}`}
                description={item.brand ? item.brand : null}
                left={(props) => (
                  <Checkbox.Android
                    status={item.isPacked ? 'checked' : 'unchecked'}
                    onPress={item.toggleIsPacked}
                    color={colors.tertiary}
                  />
                )}
              />
              <Divider />
            </>
          )}
        />
      </View>
    </SafeAreaScreen>
  );
}
