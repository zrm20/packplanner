import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text } from 'react-native-paper';

import useStyles from './RegisterScreen.styles';
import useUser from '../../../hooks/user/useUser';
import { AuthStackParamList } from '../../../navigation/navigation.types';
import { SafeAreaScreen } from '../../ui';
import LoadingBackdrop from '../../ui/LoadingBackdrop/LoadingBackdrop';
import RegisterForm from '../RegisterForm/RegisterForm';

type RegisterScreenProps = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export default function RegisterScreen(props: RegisterScreenProps): JSX.Element {
  const styles = useStyles();
  const { isLoading, register } = useUser();
  const { goBack } = props.navigation;

  function handleSubmit(values: RegisterFormData) {
    register(values);
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
