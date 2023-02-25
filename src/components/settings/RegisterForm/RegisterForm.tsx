import { Formik } from "formik";
import React from "react";
import { Alert, View, ViewStyle } from "react-native";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

import { SubmitButton, TextInput } from "../../formComponents";
import useStyles from "./RegisterForm.styles";
import { useNavigation } from "@react-navigation/native";
import useUser from "../../../hooks/user/useUser";

interface RegisterFormProps {
  style?: ViewStyle;
};

export default function RegisterForm(props: RegisterFormProps): JSX.Element {
  const styles = useStyles();
  const { navigate } = useNavigation();
  const { register } = useUser();

  const initialValues: RegisterFormData = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  function handleSubmit(values: RegisterFormData) {
    register(values, () => navigate("Settings", { screen: "SettingsHome" }));
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
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
      </View>
    </Formik>
  );
};
