import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView } from 'react-native';

import useStyles from './NewItemScreen.styles';
import { useInventoryActions } from '../../../hooks';
import useThrowAlert from '../../../hooks/alerts/useThrowAlert';
import { LockerStackParamList } from '../../../navigation/navigation.types';
import { ContainedModalTitle, SafeAreaScreen } from '../../ui';
import InventoryForm from '../InventoryForm/InventoryForm';

type NewItemScreenProps = NativeStackScreenProps<LockerStackParamList, 'NewItem'>;

export default function NewItemScreen({ navigation }: NewItemScreenProps): JSX.Element {
  const styles = useStyles();
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
    <SafeAreaScreen style={styles.container}>
      <ContainedModalTitle title="New Item" />
      <ScrollView style={styles.scrollView}>
        <InventoryForm onSubmit={handleSubmit} />
      </ScrollView>
    </SafeAreaScreen>
  );
}
