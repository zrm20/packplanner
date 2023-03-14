import React from "react";
import { View, ViewStyle } from "react-native";
import { Formik } from "formik";

import { TextInput, SubmitButton } from "../../formComponents";
import useStyles from "./LoginForm.styles";
import useUser from "../../../hooks/user/useUser";
import { useNavigation } from "@react-navigation/native";
import { HelperText, Text } from "react-native-paper";
import loginFormSchema from "./LoginForm.schema";

interface LoginFormProps {
  style?: ViewStyle;
};

export default function LoginForm(props: LoginFormProps): JSX.Element {
  const styles = useStyles();
  const { login, error } = useUser();
  const { navigate } = useNavigation();

  const initialValues: LoginFormData = {
    email: "",
    password: ""
  };

  function handleSubmit(values: LoginFormData): void {
    login(values.email, values.password, () => navigate("Settings", { screen: "SettingsHome" }));
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={loginFormSchema}
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

        <SubmitButton mode="contained" style={styles.submit}>
          Login
        </SubmitButton>

        {
          Boolean(error) &&
          <Text style={styles.errorText}>{error}</Text>
        }
      </View>
    </Formik>
  );
};
