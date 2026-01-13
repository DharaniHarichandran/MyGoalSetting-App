import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './src/store/store';
import { name as appName } from './app.json';
import React from 'react';

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
