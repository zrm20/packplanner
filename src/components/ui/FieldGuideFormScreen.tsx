import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';

import ContainedModalTitle from './ContainedModalTitle/ContainedModalTitle';
import SafeAreaScreen from './SafeAreaScreen/SafeAreaScreen';
import { useTheme } from '../../theme';

export default function FieldGuideFormScreen(props: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}): JSX.Element {
  const { space } = useTheme();
  return (
    <SafeAreaScreen>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ContainedModalTitle title={props.title} eyebrow={props.eyebrow} />
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingHorizontal: space[3], paddingBottom: space[4] }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag">
          {props.children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaScreen>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, width: '100%' } });
