import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../screens/LoginScreen';
import RegistroScreen from '../screens/RegistroScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown:false}}>
      <Stack.Screen name= "Login" component={LoginScreen}  />
      <Stack.Screen name= "Registro" component={RegistroScreen} /> 
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