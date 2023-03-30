import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text } from 'react-native-paper';

import useStyles from './RegisterScreen.styles';
import useUser from '../../../hooks/user/useUser';
import { SettingsStackParamList } from '../../../navigation/navigation.types';
import { SafeAreaScreen } from '../../ui';
import LoadingBackdrop from '../../ui/LoadingBackdrop/LoadingBackdrop';
import RegisterForm from '../RegisterForm/RegisterForm';

type RegisterGuestScreenProps = NativeStackScreenProps<SettingsStackParamList, 'RegisterGuest'>;

export default function RegisterGuestScreen(props: RegisterGuestScreenProps): JSX.Element {
  const styles = useStyles();
  const { isLoading, registerGuest } = useUser();
  const { goBack, navigate } = props.navigation;

  function handleSubmit(values: RegisterFormData): void {
    registerGuest(values, () => navigate('SettingsHome'));
  }

  return (
    <>
      <LoadingBackdrop show={isLoading} />
      <SafeAreaScreen style={styles.container}>
        <Text style={styles.title} variant="displaySmall">
          Register
        </Text>

        <RegisterForm style={styles.form} onSubmit={handleSubmit} />
        <Button mode="contained" onPress={goBack}>
          Back
        </Button>
      </SafeAreaScreen>
    </>
  );
}
