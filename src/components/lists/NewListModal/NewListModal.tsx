import React, { useState } from "react";
import { Button, Dialog, Text, TextInput } from "react-native-paper";
import { useLists } from "../../../hooks";
import useThrowAlert from "../../../hooks/alerts/useThrowAlert";

import useStyles from "./NewListModal.styles";

interface ListModalProps {
  visible: boolean;
  toggleVisibility(): void;
};

export default function NewListModal(props: ListModalProps): JSX.Element {
  const styles = useStyles();
  const [text, setText] = useState<string>('');
  const { savePackAsList } = useLists();
  const { catchUnknownError }= useThrowAlert();

  async function submitList(): Promise<void> {
    try {
      await savePackAsList(text);
      setText("");
      props.toggleVisibility();
    } catch (err) {
      catchUnknownError("Failed to save list. Please try again.")
    }
  };

  return (
    <Dialog style={styles.container} visible={props.visible} onDismiss={props.toggleVisibility}>
      <Dialog.Title style={styles.title}>New List</Dialog.Title>
      <Dialog.Content>
        <Text>Save your current pack as a list.</Text>

        <TextInput
          label="List Name"
          mode="outlined"
          style={styles.input}
          value={text}
          onChangeText={setText}
        />
      </Dialog.Content>
      <Dialog.Actions style={styles.actions}>
        <Button
          mode="contained"
          disabled={!Boolean(text)}
          onPress={submitList}
        >Save</Button>
        <Button mode="outlined" onPress={props.toggleVisibility}>Cancel</Button>
      </Dialog.Actions>
    </Dialog>
  );
};
