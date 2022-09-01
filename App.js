/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import codePush from 'react-native-code-push';
import RootNavigator from './src/routes/RootNavigator';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
  updateDialog: true,
  appendReleaseDescription: true,
};
const App = () => {
  const theme = {
    ...PaperDefaultTheme,
    roundness: 2,
    version: 3,
    colors: {
      ...PaperDefaultTheme.colors,
      background: '#fff',
      text: '#333333',
      primary: '#42a5f5',
    },
  };
  return (
    <PaperProvider theme={theme}>
      <RootNavigator />
    </PaperProvider>
  );
};

export default codePush(codePushOptions)(App);
