import React from 'react';
import { NavBar } from './navigation/NavBar'
import store from './redux/Store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavBar />
      </PersistGate>
    </Provider>
  );
}

