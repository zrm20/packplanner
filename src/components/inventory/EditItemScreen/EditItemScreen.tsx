import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import { useItemModel } from '../../../hooks';
import useThrowAlert from '../../../hooks/alerts/useThrowAlert';
import { LockerStackParamList } from '../../../navigation/navigation.types';
import FieldGuideFormScreen from '../../ui/FieldGuideFormScreen';
import InventoryForm from '../InventoryForm/InventoryForm';

type EditItemScreenProps = NativeStackScreenProps<LockerStackParamList, 'EditItem'>;

export default function EditItemScreen({ route, navigation }: EditItemScreenProps): JSX.Element {
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
    <FieldGuideFormScreen title="Edit item" eyebrow="Locker / Field guide">
      <InventoryForm
        onSubmit={handleSubmit}
        initialValues={item}
        submitText="Save changes"
        onDelete={handleDelete}
      />
    </FieldGuideFormScreen>
  );
}
