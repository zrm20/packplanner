import React from 'react';
import { useColorScheme } from "react-native";
import store, { persistor } from './src/redux/store';
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as ThemeProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator/AppNavigator';
import { theme as lightTheme } from "./src/theme/theme";


export default function App() {
  const colorScheme = useColorScheme();
  const theme = lightTheme;

  // TODO add loading component
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ThemeProvider theme={theme} >
          <AppNavigator />
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider >
  );
}

