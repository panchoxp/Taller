import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../screens/LoginScreen';
import RegistroScreen from '../screens/RegistroScreen';
import Game from '../src/components/Game';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name= "Login" component={LoginScreen} />
      <Stack.Screen name= "BottomRegistrar" component={RegistroScreen} />
      <Stack.Screen name= "Game" component={Game} />
    </Stack.Navigator>
  );
}

export default function Navegador(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}