import React from 'react';
import { useColorScheme } from "react-native";
import store from './src/redux/store';
import { Provider as ReduxProvider } from 'react-redux'
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistStore } from 'redux-persist';
import { Provider as ThemeProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator/AppNavigator';
import { theme as lightTheme, darkTheme } from "./src/theme/theme";

// let persistor = persistStore(store);

export default function App() {
  const colorScheme = useColorScheme();

  const theme = colorScheme === 'light' ? lightTheme : darkTheme

  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme} >
        <AppNavigator />
      </ThemeProvider>
    </ReduxProvider >
  );
}

