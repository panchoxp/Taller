import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
//para datos de usuario
import { ref, set } from "firebase/database";
import { db } from '../config/Config';
//para registro
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';


const RegistroScreen = ({navigation}:any) => {
  const [nick, setNick] = useState('');
  const [pais, setpais] = useState('')
  const [fechaDeNacimiento, setfechaDeNacimiento] = useState('')
  const [correo, setCorreo] = useState('');  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function datosUsuario(){
    set(ref(db, 'usuarios/' + nick), {
      nick: nick,
      pais: pais,
      fechaDeNacimiento: fechaDeNacimiento,
      correo:correo,           
  });
  }

  function registro() {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    createUserWithEmailAndPassword(auth, correo, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        navigation.navigate("Login");  //redirigir al login
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        Alert.alert(errorCode, errorMessage);
      });
  }

  

  return (
    <ImageBackground source={{ uri: 'https://img.freepik.com/fotos-premium/fondo-pantalla-juegos-coloridos-call-of-duty-4k_669273-265.jpg' }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Registro</Text>

        <TextInput
          style={styles.input}
          placeholder="Nick"
          placeholderTextColor="#aaa"
          value={nick}
          onChangeText={setNick}
        />
        <TextInput
          style={styles.input}
          placeholder="Pais"
          placeholderTextColor="#aaa"
          value={nick}
          onChangeText={setpais}
        />
        <TextInput
          style={styles.input}
          placeholder="fecha de nacimiento"
          placeholderTextColor="#aaa"
          value={nick}
          onChangeText={setfechaDeNacimiento}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value={correo}
          onChangeText={setCorreo}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Verificar Contraseña"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={()=>registro()}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
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
});

export default RegistroScreen;
