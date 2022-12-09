import React from 'react';
import { View, Text, useColorScheme } from "react-native";
// import store from './redux/Store'
// import { Provider as ReduxProvider } from 'react-redux'
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
    // <ReduxProvider store={store}>
    //   <PersistGate loading={null} persistor={persistor}>
    <ThemeProvider theme={theme} >
      <AppNavigator />
    </ThemeProvider>
    //   </PersistGate>
    // </ReduxProvider>
  );
}

