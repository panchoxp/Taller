import { Alert, Button, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
//loggin firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function LoginScreen({ navigation }: any) {

  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  function login() {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigation.navigate("Game");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        //console.log(errorCode);

        switch (errorCode) {
          case 'auth/invalid-credential':
            Alert.alert('Error', 'Usuario no existente.');
            break;
          case 'auth/invalid-email':
            Alert.alert('Error', 'Correo inválido.');
            break;
          case 'auth/missing-password':
            Alert.alert('Error', 'Ingrese una contraseña.');
            break;
          case 'auth/too-many-requests':
            Alert.alert('Error', 'La contraseña es incorrecta.');
            break;
          default:
            Alert.alert(errorMessage);
            break;
        }
      });
  }

  return (
    <ImageBackground
      source={{ uri: "https://img.freepik.com/fotos-premium/fondo-pantalla-juegos-coloridos-call-of-duty-4k_669273-265.jpg" }}
      style={styles.container}
    >

      <Text style={{ color: '#0df2c9', fontSize: 60, fontWeight: 'bold', marginBottom: 30 }}>Login</Text>

      <TextInput
        placeholder='Ingresa tu correo electrónico'
        placeholderTextColor="#aaa"
        onChangeText={(texto) => setCorreo(texto)}
        keyboardType='email-address'
        value={correo}
        style={styles.input}
      />

      <TextInput
        placeholder='Ingresa contraseña'
        placeholderTextColor="#aaa"
        onChangeText={(texto) => setContrasenia(texto)}
        secureTextEntry
        value={contrasenia}
        style={styles.input}
      />

      <TouchableOpacity>
        <Text style={{ color: 'rgb(rgb(255, 63, rgb(212, 255, 0)), 255, 0)', fontSize: 16 }}>Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => login()}
      >
        <Text style={styles.buttonText} >Ingresar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} 
      >
        <Text style={styles.buttonText} onPress={() => navigation.navigate('BottomRegistrar')}>Registrarse</Text>
      </TouchableOpacity>

    </ImageBackground>
  )
}

const styles = StyleSheet.create({


  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  input: {
    backgroundColor: '#0009',
    height: 50,
    width: '80%',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 40,
    paddingHorizontal: 15,
    color: 'white',
    borderColor: 'rgb(86, 0, 136)',
    fontSize: 17
  },

  button: {
    backgroundColor: 'rgb(0, 216, 255)',
    borderRadius: 20,
    padding: 13,
    width: '50%',
    marginTop: 20
  },

  buttonText: {
    color: '#000',
    fontSize: 22,
    textAlign: 'center',

  }
})