import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, View } from 'react-native';
import { ActivityIndicator, HelperText, IconButton, Text } from 'react-native-paper';

import useStyles from './PacksScroller.styles';
import { usePacks } from '../../../hooks';
import { useSelector } from '../../../redux/reduxHooks';
import PackItem from '../PackItem/PackItem';

export default function PacksScroller(): JSX.Element {
  const { navigate } = useNavigation();
  const { packs } = usePacks();
  const isLoading = useSelector((state) => state.packs.isLoading);
  const styles = useStyles();

  function openNewPackScreen(): void {
    navigate('Locker', { screen: 'NewPack' });
  }

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Text variant="headlineSmall">My packs</Text>
        <IconButton
          accessibilityLabel="Add pack"
          icon="plus"
          size={16}
          mode="outlined"
          style={styles.addButton}
          onPress={openNewPackScreen}
        />
      </View>

      <View style={styles.packsContainer}>
        {isLoading ? (
          <ActivityIndicator style={styles.spinner} />
        ) : (
          <FlatList
            data={packs}
            ListEmptyComponent={
              <HelperText type="info" style={styles.emptyText}>
                No packs added yet
              </HelperText>
            }
            keyExtractor={(item) => item.id}
            renderItem={(data) => <PackItem pack={data.item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}
