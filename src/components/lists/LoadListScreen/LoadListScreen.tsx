import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, View } from "react-native";
import { IconButton, List, Text } from "react-native-paper";
import { useLists } from "../../../hooks";
import useThrowAlert from "../../../hooks/alerts/useThrowAlert";
import { MyPackStackParamList } from "../../../navigation/navigation.types";

import { SafeAreaScreen } from "../../ui";
import useStyles from "./LoadListScreen.styles";

type LoadListScreenProps = NativeStackScreenProps<MyPackStackParamList, "Lists">

export default function LoadListScreen(props: LoadListScreenProps): JSX.Element {
  const styles = useStyles();
  const { lists, loadList, deleteList } = useLists();
  const { navigation } = props;
  const { catchUnknownError } = useThrowAlert();

  function handleLoadList(list: TripListData): void {
    loadList(list);
    navigation.goBack();
  };

  async function handleDeleteList(listId: string): Promise<void> {
    try {
      await deleteList(listId);
      navigation.goBack();
    } catch (err) {
      catchUnknownError(err, "Failed to delete list. Please try again");
    }
  };

  return (
    <SafeAreaScreen style={styles.container} >
      <Text variant="headlineLarge" style={styles.title}>Load List</Text>

      <View style={styles.listContainer}>
        <FlatList
          data={lists}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text style={styles.emptyText}>No lists saved yet</Text>}
          renderItem={({ item }) => (
            <List.Item
              title={item.name}
              description={`${item.myPackState.itemsInPack.length} items`}
              right={props => (
                <>
                  <IconButton icon="delete" onPress={() => handleDeleteList(item.id)} />
                  <IconButton icon="download" onPress={() => handleLoadList(item)} />
                </>
              )}
            />
          )}
        />
      </View>
    </SafeAreaScreen>
  );
};
