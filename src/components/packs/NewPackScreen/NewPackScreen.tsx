import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

import useStyles from './NewPackScreen.styles';
import { usePacks } from '../../../hooks';
import useThrowAlert from '../../../hooks/alerts/useThrowAlert';
import type { LockerStackParamList } from '../../../navigation/navigation.types';
import { ContainedModalTitle, SafeAreaScreen } from '../../ui';
import PackForm from '../PackForm/PackForm';

type NewPackScreenProps = NativeStackScreenProps<LockerStackParamList, 'NewPack'>;

export default function NewPackScreen({ navigation }: NewPackScreenProps): JSX.Element {
  const styles = useStyles();
  const { addPack } = usePacks();
  const { catchUnknownError } = useThrowAlert();

  async function handleSubmit(pack: PackData): Promise<void> {
    try {
      await addPack(pack);
      navigation.goBack();
    } catch (err) {
      catchUnknownError(err, 'Failed to add pack, please try again');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaScreen style={styles.container}>
        <ContainedModalTitle title="New Pack" />

        <PackForm onSubmit={handleSubmit} />
      </SafeAreaScreen>
    </TouchableWithoutFeedback>
  );
}
