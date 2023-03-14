import { Formik } from "formik";
import React from "react";
import { Text, View, ViewStyle } from "react-native";

import { SubmitButton, TextInput } from "../../formComponents";
import useStyles from "./RegisterForm.styles";
import useUser from "../../../hooks/user/useUser";
import registerFormSchema from "./RegisterForm.schema";

interface RegisterFormProps {
  style?: ViewStyle;
};

export default function RegisterForm(props: RegisterFormProps): JSX.Element {
  const styles = useStyles();
  const { register, error } = useUser();

  const initialValues: RegisterFormData = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  function handleSubmit(values: RegisterFormData) {
    register(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={registerFormSchema}
    >
      <View style={[styles.container, props.style]} >
        <TextInput
          name='email'
          label="Email Address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <TextInput
          name='password'
          label="Password"
          secureTextEntry
          autoCapitalize="none"
        />
        <TextInput
          name='confirmPassword'
          label="Confirm Password"
          secureTextEntry
          autoCapitalize="none"
        />

        <SubmitButton mode="contained" style={styles.submit}>
          Register
        </SubmitButton>

        {
          Boolean(error) &&
          <Text style={styles.errorText}>{error}</Text>
        }
      </View>
    </Formik>
  );
};
