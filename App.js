import React from 'react';
import { NavBar } from './navigation/NavBar'
import store from './redux/Store'
import { Provider } from 'react-redux'

export default function App() {
  return (
    <Provider store={store}>
      <NavBar />
    </Provider>
  );
}

