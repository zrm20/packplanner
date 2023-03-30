import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { IconButton, List, Text } from 'react-native-paper';

import useStyles from './LoadListScreen.styles';
import { useLists } from '../../../hooks';
import useThrowAlert from '../../../hooks/alerts/useThrowAlert';
import { MyPackStackParamList } from '../../../navigation/navigation.types';
import { confirmDelete } from '../../../utils';
import { ContainedModalTitle, LoadingBackdrop, SafeAreaScreen } from '../../ui';

type LoadListScreenProps = NativeStackScreenProps<MyPackStackParamList, 'Lists'>;

export default function LoadListScreen(props: LoadListScreenProps): JSX.Element {
  const styles = useStyles();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { lists, loadList, deleteList } = useLists();
  const { navigation } = props;
  const { catchUnknownError } = useThrowAlert();

  function handleLoadList(list: TripListData): void {
    loadList(list);
    navigation.goBack();
  }

  async function handleDeleteList(listId: string): Promise<void> {
    setIsLoading(true);
    try {
      await deleteList(listId); // TODO Fix these async callbacks
      setIsLoading(false);
    } catch (err) {
      catchUnknownError(err, 'Failed to delete list. Please try again');
      setIsLoading(false);
    }
  }

  function confirmHandleDelete(listId: string): void {
    confirmDelete(() => handleDeleteList(listId), 'Are you sure you want to delete this list?');
  }

  return (
    <SafeAreaScreen style={styles.container}>
      <LoadingBackdrop show={isLoading} />
      <ContainedModalTitle title="Load List" />

      <View style={styles.listContainer}>
        <FlatList
          data={lists}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text style={styles.emptyText}>No lists saved yet</Text>}
          renderItem={({ item }) => (
            <List.Item
              title={item.name}
              description={`${item.myPackState.itemsInPack.length} items`}
              right={(props) => (
                <>
                  <IconButton icon="delete" onPress={() => confirmHandleDelete(item.id)} />
                  <IconButton icon="download" onPress={() => handleLoadList(item)} />
                </>
              )}
            />
          )}
        />
      </View>
    </SafeAreaScreen>
  );
}
