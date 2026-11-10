import { useFonts } from 'expo-font';
import React from 'react';
import { Provider as ThemeProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { AppAlert } from './src/components/ui';
import AppNavigator from './src/navigation/AppNavigator/AppNavigator';
import store, { persistor } from './src/redux/store';
import { fontAssets } from './src/theme/fonts';
import { theme as lightTheme } from './src/theme/theme';

export default function App() {
  const theme = lightTheme;
  const [fontsLoaded, fontError] = useFonts(fontAssets);

  // On a font load error, render anyway and let the platform fall back to system fonts.
  if (!fontsLoaded && !fontError) {
    return null;
  }

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
