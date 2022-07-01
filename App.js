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

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  updateDialog: {appendReleaseDescription: true},
};
const App = () => {
  return (
    <>
      <RootNavigator />
    </>
  );
};

export default codePush(codePushOptions)(App);
