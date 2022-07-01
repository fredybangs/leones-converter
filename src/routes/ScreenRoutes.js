import React from 'react';
import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ConversionScreen from '../screens/ConversionScreen';
import HelpSCreen from '../screens/HelpScreen';

const Tab = createBottomTabNavigator();
const MainStack = createNativeStackNavigator();

const ScreenRoutes = () => {
  return (
    <MainStack.Navigator
      initialRouteName="Main"
      screenOptions={{headerShown: false}}>
      <MainStack.Screen name="Main" component={MainTab} />
    </MainStack.Navigator>
  );
};

const MainTab = () => {
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Help') {
            iconName = focused
              ? 'ios-information-circle-sharp'
              : 'ios-information-circle-outline';
          }
          return <Ionicons name={iconName} size={26} color={color} />;
        },
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.primary, //color you want to change
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
        tabBarShowLabel: false,
      })}>
      <Tab.Screen name="Home" component={ConversionScreen} />
      <Tab.Screen name="Help" component={HelpSCreen} />
    </Tab.Navigator>
  );
};

export default ScreenRoutes;
