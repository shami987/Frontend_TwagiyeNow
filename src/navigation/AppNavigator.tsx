import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OpeningScreen from '../screens/OpeningScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LiveBusTrackerScreen from '../screens/LiveBusTrackerScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Opening">
        <Stack.Screen name="Opening" component={OpeningScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Home" component={LiveBusTrackerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
