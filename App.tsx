import React from 'react';
import { useColorScheme } from "react-native";
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as ThemeProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator/AppNavigator';

import store, { persistor } from './src/redux/store';
import { theme as lightTheme } from "./src/theme/theme";
import { AppAlert } from './src/components/ui';

export default function App() {
  const colorScheme = useColorScheme();
  const theme = lightTheme;

  // TODO add loading component
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ThemeProvider theme={theme} >
          <AppNavigator />
          <AppAlert />
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider >
  );
}

