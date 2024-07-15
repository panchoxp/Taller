import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../screens/LoginScreen';
import RegistroScreen from '../screens/RegistroScreen';
import Game from '../src/components/Game';
import DatosUsScreen from '../screens/DatosUsScreen';
import OpcionesScreen from '../screens/OpcionesScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown:false}}>
      <Stack.Screen name= "Login" component={LoginScreen} />
      <Stack.Screen name= "BottomRegistrar" component={RegistroScreen} />
      <Stack.Screen name= "Usuario" component={MyStack2} />
    </Stack.Navigator>
  );
}

function MyStack2() {
  return (
    <Stack.Navigator initialRouteName='Opciones' >
      <Stack.Screen name= "Opciones" component={OpcionesScreen} />
      <Stack.Screen name= "Game" component={Game} />
      <Stack.Screen name= "DatosUsuario" component={DatosUsScreen} />      
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