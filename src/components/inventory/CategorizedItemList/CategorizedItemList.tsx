import React from 'react';
import { FlatList, Text, TextStyle } from 'react-native';

import useStyles from './CategorizedItemList.styles';
import { useSelector } from '../../../redux/reduxHooks';
import InventoryItem from '../InventoryItem/InventoryItem';

interface CategorizedItemListProps {
  data: Item[];
  itemProps?: {
    disabled?: boolean;
  };
}

function CategoryLabel(props: { id: string; style: TextStyle }): JSX.Element {
  const category = useSelector((state) =>
    state.categories.categories.find((c) => c.id === props.id)
  )!;

  return <Text style={props.style}>{category.label}</Text>;
}

export default function CategorizedItemList(props: CategorizedItemListProps): JSX.Element {
  const styles = useStyles();
  const { data } = props;

  const sortedInventory = data.sort((a, b) => {
    const catA = a.category;
    const catB = b.category;

    if (catA < catB) {
      return -1;
    } else if (catA > catB) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => {
        // if category is different from the previous item, render a category label
        if (item.category !== props.data[index - 1]?.category) {
          return (
            <>
              <CategoryLabel id={item.category} style={styles.catHeader} />
              <InventoryItem item={item} openOnPress />
            </>
          );
        } else {
          return <InventoryItem item={item} openOnPress />;
        }
      }}
      {...props}
      data={sortedInventory}
    />
  );
}
