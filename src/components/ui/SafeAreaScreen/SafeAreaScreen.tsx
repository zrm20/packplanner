import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaViewProps } from 'react-native-safe-area-context';

import { isAndroid } from '../../../utils';

interface Props extends SafeAreaViewProps {
  alignCenter?: boolean;
  justifyCenter?: boolean;
}

interface Style {
  container: ViewStyle;
}

export default function SafeAreaScreen(props: Props): JSX.Element {
  const { alignCenter = false, justifyCenter = false, ...rest } = props;
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    container: {
      marginTop: isAndroid() ? StatusBar.currentHeight : 0,
      flex: 1,
      alignItems: alignCenter ? 'center' : 'flex-start',
      justifyContent: justifyCenter ? 'center' : 'flex-start',
      backgroundColor: theme.colors.background,
    },
  });

  return (
    <SafeAreaView {...rest} style={[styles.container, props.style]}>
      {props.children}
    </SafeAreaView>
  );
}
