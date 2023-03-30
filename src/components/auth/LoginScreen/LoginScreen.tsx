import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text } from 'react-native-paper';

import useStyles from './LoginScreen.styles';
import useUser from '../../../hooks/user/useUser';
import { AuthStackParamList } from '../../../navigation/navigation.types';
import { LoadingBackdrop, SafeAreaScreen } from '../../ui';
import LoginForm from '../LoginForm/LoginForm';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen(props: LoginScreenProps): JSX.Element {
  const styles = useStyles();
  const { isLoading } = useUser();
  const { goBack } = props.navigation;

  return (
    <>
      <LoadingBackdrop show={isLoading} />
      <SafeAreaScreen style={styles.container}>
        <Text variant="displaySmall">Login</Text>
        <LoginForm style={styles.form} />
        <Button mode="contained" onPress={goBack}>
          Go Back
        </Button>
      </SafeAreaScreen>
    </>
  );
}
