import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import { useInventoryActions } from '../../../hooks';
import useThrowAlert from '../../../hooks/alerts/useThrowAlert';
import { LockerStackParamList } from '../../../navigation/navigation.types';
import FieldGuideFormScreen from '../../ui/FieldGuideFormScreen';
import InventoryForm from '../InventoryForm/InventoryForm';

type NewItemScreenProps = NativeStackScreenProps<LockerStackParamList, 'NewItem'>;

export default function NewItemScreen({ navigation }: NewItemScreenProps): JSX.Element {
  const { addToInventory } = useInventoryActions();
  const { catchUnknownError } = useThrowAlert();

  async function handleSubmit(newItem: ItemFormData): Promise<void> {
    try {
      await addToInventory(newItem);
      navigation.navigate('Inventory');
    } catch (err) {
      catchUnknownError(err, 'Failed to add new item. Please try again.');
    }
  }

  return (
    <FieldGuideFormScreen title="Add item" eyebrow="Locker / Field guide">
      <InventoryForm onSubmit={handleSubmit} submitText="Add item" />
    </FieldGuideFormScreen>
  );
}
