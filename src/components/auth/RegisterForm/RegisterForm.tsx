import { Formik } from 'formik';
import React from 'react';
import { Text, View, ViewStyle } from 'react-native';

import registerFormSchema from './RegisterForm.schema';
import useStyles from './RegisterForm.styles';
import useUser from '../../../hooks/user/useUser';
import { SubmitButton, TextInput } from '../../formComponents';

interface RegisterFormProps {
  style?: ViewStyle;
  onSubmit(values: RegisterFormData): void;
}

export default function RegisterForm(props: RegisterFormProps): JSX.Element {
  const styles = useStyles();
  const { error } = useUser();

  const initialValues: RegisterFormData = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={props.onSubmit}
      validationSchema={registerFormSchema}>
      <View style={[styles.container, props.style]}>
        <TextInput name="email" label="Email Address" autoCapitalize="none" autoComplete="email" />

        <TextInput name="password" label="Password" secureTextEntry autoCapitalize="none" />
        <TextInput
          name="confirmPassword"
          label="Confirm Password"
          secureTextEntry
          autoCapitalize="none"
          submitOnEnter
        />

        <SubmitButton mode="contained" style={styles.submit}>
          Register
        </SubmitButton>

        {Boolean(error) && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </Formik>
  );
}
