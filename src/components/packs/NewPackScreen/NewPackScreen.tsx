import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import { usePacks } from '../../../hooks';
import useThrowAlert from '../../../hooks/alerts/useThrowAlert';
import type { LockerStackParamList } from '../../../navigation/navigation.types';
import FieldGuideFormScreen from '../../ui/FieldGuideFormScreen';
import PackForm from '../PackForm/PackForm';

type NewPackScreenProps = NativeStackScreenProps<LockerStackParamList, 'NewPack'>;

export default function NewPackScreen({ navigation }: NewPackScreenProps): JSX.Element {
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
    <FieldGuideFormScreen title="Add pack" eyebrow="Locker / Field guide">
      <PackForm onSubmit={handleSubmit} />
    </FieldGuideFormScreen>
  );
}
