/**
 * DISPOSABLE (#32): prototype root — fixture store, no PersistGate, no live auth/subscriptions.
 * Activated only when EXPO_PUBLIC_PROTOTYPE=1 (see App.tsx).
 */
import React, { useMemo } from 'react';
import { Provider as ThemeProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';

import { AppAlert } from '../components/ui';
import { createPrototypeStore } from './createPrototypeStore';
import { parsePrototypeQuery } from './parsePrototypeQuery';
import PrototypeAppNavigator from './PrototypeAppNavigator';
import { PrototypeControlsProvider } from './PrototypeControlsContext';
import { resolvePrototypeTheme } from './themes';

function readSearch(): string {
  if (typeof window === 'undefined') return '';
  return window.location.search || '';
}

export default function PrototypeApp(): JSX.Element {
  const store = useMemo(() => createPrototypeStore(), []);
  const config = useMemo(() => parsePrototypeQuery(readSearch()), []);
  const { theme } = resolvePrototypeTheme(config.direction);

  return (
    <ReduxProvider store={store}>
      <PrototypeControlsProvider value={config}>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider style={{ backgroundColor: theme.colors.background }}>
            <PrototypeAppNavigator config={config} />
            <AppAlert />
          </SafeAreaProvider>
        </ThemeProvider>
      </PrototypeControlsProvider>
    </ReduxProvider>
  );
}
