import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import RegistroScreen from './screens/RegistroScreen';
import Navegador from './navigators/MainNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Game from './src/components/Game';
import 'react-native-gesture-handler';

export default function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex:1, backgroundColor:'green'}}>
      <Navegador/>
  </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
