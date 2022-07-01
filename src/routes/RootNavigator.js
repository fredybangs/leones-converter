import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ScreenRoutes from './ScreenRoutes';

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <ScreenRoutes />
    </NavigationContainer>
  );
};

export default RootNavigator;
