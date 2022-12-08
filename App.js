import React from 'react';
import { View, Text } from "react-native";
import { NavBar } from './navigation/NavBar'
import store from './redux/Store'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Button, Provider as ThemeProvider } from 'react-native-paper';
import theme from "./theme/theme";

let persistor = persistStore(store);

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme} >
          {/* <NavBar /> */}
          <View style={{ justifyContent: 'center', flex: 1 }}>
            <Text>Blank Slate</Text>
            <Button>Hello</Button>
            <Button mode="contained">Hello</Button>
            <Button mode="outlined">Hello</Button>
          </View>
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
}

