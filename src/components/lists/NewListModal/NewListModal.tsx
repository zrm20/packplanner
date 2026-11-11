import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Button, Dialog, Text, TextInput } from 'react-native-paper';

import useStyles from './NewListModal.styles';
import { useLists, useInventory, usePacks, useSettings } from '../../../hooks';
import useThrowAlert from '../../../hooks/alerts/useThrowAlert';
import { getTotalWeight } from '../../../utils/inventoryUtils/inventoryUtils';

interface ListModalProps {
  visible: boolean;
  toggleVisibility(): void;
}

export default function NewListModal(props: ListModalProps): JSX.Element {
  const styles = useStyles();
  const { selectedPack } = usePacks();
  const { itemsInPack, getBaseWeightItems } = useInventory();
  const { weightUnit } = useSettings();
  const baseWeight = (selectedPack?.weight || 0) + getTotalWeight(getBaseWeightItems(itemsInPack));
  const [text, setText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { savePackAsList } = useLists();
  const { catchUnknownError } = useThrowAlert();

  async function submitList(): Promise<void> {
    setIsLoading(true);
    try {
      await savePackAsList(text);
      setText('');
      props.toggleVisibility();
    } catch (err) {
      catchUnknownError(err, 'Failed to save list. Please try again.');
    }
    setIsLoading(false);
  }

  return (
    <Dialog style={styles.container} visible={props.visible} onDismiss={props.toggleVisibility}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Dialog.Title style={styles.title}>Save list</Dialog.Title>
        <Dialog.Content>
          <Text>Save your current pack as a list.</Text>
          <View style={styles.context}>
            <Text variant="labelMedium" style={styles.eyebrow}>
              Current pack
            </Text>
            <Text variant="titleLarge">
              {selectedPack ? `${selectedPack.brand} ${selectedPack.model}` : 'No pack selected'}
            </Text>
            <Text variant="bodyMedium">
              {itemsInPack.length} items · {Math.round(weightUnit.convert(baseWeight) * 100) / 100}{' '}
              {weightUnit.label} base weight
            </Text>
          </View>

          <TextInput
            label="List Name"
            accessibilityLabel="List Name"
            mode="outlined"
            style={styles.input}
            value={text}
            onChangeText={setText}
          />
        </Dialog.Content>
        {isLoading && <ActivityIndicator />}
        <Dialog.Actions style={styles.actions}>
          <Button mode="contained" disabled={!text || isLoading} onPress={submitList}>
            Save
          </Button>
          <Button mode="outlined" onPress={props.toggleVisibility}>
            Cancel
          </Button>
        </Dialog.Actions>
      </ScrollView>
    </Dialog>
  );
}
