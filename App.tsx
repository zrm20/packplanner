import React from 'react';
import { Provider as ThemeProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { AppAlert } from './src/components/ui';
import AppNavigator from './src/navigation/AppNavigator/AppNavigator';
import store, { persistor } from './src/redux/store';
import { theme as lightTheme } from './src/theme/theme';

export default function App() {
  const theme = lightTheme;

  // TODO add loading component
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ThemeProvider theme={theme}>
          <AppNavigator />
          <AppAlert />
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
