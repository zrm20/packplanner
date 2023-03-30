import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView } from 'react-native';

import useStyles from './EditItemScreen.styles';
import { useItemModel } from '../../../hooks';
import useThrowAlert from '../../../hooks/alerts/useThrowAlert';
import { LockerStackParamList } from '../../../navigation/navigation.types';
import { ContainedModalTitle, SafeAreaScreen } from '../../ui';
import InventoryForm from '../InventoryForm/InventoryForm';

type EditItemScreenProps = NativeStackScreenProps<LockerStackParamList, 'EditItem'>;

export default function EditItemScreen({ route, navigation }: EditItemScreenProps): JSX.Element {
  const styles = useStyles();
  const { catchUnknownError } = useThrowAlert();

  const { item } = route.params;
  const itemModel = useItemModel(item);

  async function handleSubmit(newValues: ItemFormData): Promise<void> {
    try {
      await itemModel.update(newValues);
      navigation.navigate('Inventory');
    } catch (err) {
      catchUnknownError(err, 'Failed to update item. Please try again.');
    }
  }

  async function handleDelete(): Promise<void> {
    try {
      await itemModel.delete();
      navigation.goBack();
    } catch (err) {
      catchUnknownError(err, 'Failed to delete item. Please try again.');
    }
  }

  return (
    <SafeAreaScreen style={styles.container}>
      <ContainedModalTitle title="Edit Item" />
      <ScrollView style={styles.scrollView}>
        <InventoryForm
          onSubmit={handleSubmit}
          initialValues={item}
          submitText="Update Item"
          onDelete={handleDelete}
        />
      </ScrollView>
    </SafeAreaScreen>
  );
}
