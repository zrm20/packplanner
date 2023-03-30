import { useFormikContext } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import useStyles from './FormActions.styles';
import { useTheme } from '../../../theme';
import { confirmDelete } from '../../../utils';

interface FormActionsProps {
  onDelete?(): Promise<void>;
  deleteMessage?: string;
}

export default function FormActions(props: FormActionsProps): JSX.Element {
  const styles = useStyles();
  const { submitForm, isSubmitting, setSubmitting } = useFormikContext();
  const { colors } = useTheme();

  function handleDelete() {
    confirmDelete(async () => {
      setSubmitting(true);
      if (props.onDelete) {
        await props.onDelete();
      }
      setSubmitting(false);
    }, props.deleteMessage || 'Are you sure you want to delete this?');
  }

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={submitForm} disabled={isSubmitting}>
        Save
      </Button>
      {Boolean(props.onDelete) && (
        <Button
          mode="contained"
          buttonColor={colors.error}
          onPress={handleDelete}
          disabled={isSubmitting}>
          Delete
        </Button>
      )}
    </View>
  );
}
