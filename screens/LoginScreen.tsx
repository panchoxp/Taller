import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

const LoginScreen = ({ navigation }: any) => {
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  const login = () => {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigation.navigate("Usuario");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

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
  };

  return (
    <ImageBackground
      source={{ uri: "https://cdn.leonardo.ai/users/313d1b5b-609c-4010-9680-3d090077aa96/generations/1216f7f6-453e-41ef-a2a2-4f25332ceb43/Default_A_vibrant_3D_logotype_featuring_a_stylized_watermelon_1.jpg" }}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>

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

          <TouchableOpacity style={styles.button } onPress={login}>
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BottomRegistrar')}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4fab36',  // Cambiado para que coincida con el segundo estilo
  },
  input: {
    backgroundColor: '#f0f0f0',
    height: 50,
    width: '100%',
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',  // Cambiado para que coincida con el segundo estilo
  },
  button: {
    backgroundColor: '#4fab36',
    borderRadius: 5,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
  },
});

export default LoginScreen;
