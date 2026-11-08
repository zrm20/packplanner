import React from 'react';
import { Provider as ThemeProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { AppAlert } from './src/components/ui';
import AppNavigator from './src/navigation/AppNavigator/AppNavigator';
import store, { persistor } from './src/redux/store';
import { theme as lightTheme } from './src/theme/theme';

/**
 * Production App is unchanged unless EXPO_PUBLIC_PROTOTYPE=1 is set at bundle time.
 * Prototype code lives under src/prototype/ and is disposable (#32).
 */
export default function App() {
  if (process.env.EXPO_PUBLIC_PROTOTYPE === '1') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const PrototypeApp = require('./src/prototype/PrototypeApp').default;
    return <PrototypeApp />;
  }

  const theme = lightTheme;

  // TODO add loading component
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider style={{ backgroundColor: theme.colors.background }}>
            <AppNavigator />
            <AppAlert />
          </SafeAreaProvider>
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
