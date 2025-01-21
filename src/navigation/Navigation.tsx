// Code to navigate between screens using react-navigation
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '../utils/NavigationUtil';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import LevelScreen from '../screens/LevelScreen';
import GameScreen from '../screens/GameScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen
          name="Home"
          options={{
            animation: 'fade',
          }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Level"
          options={{
            animation: 'fade',
          }}
          component={LevelScreen}
        />
        <Stack.Screen
          name="Game"
          options={{
            animation: 'fade',
          }}
          component={GameScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
