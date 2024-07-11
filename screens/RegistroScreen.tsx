import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
import React, { useState } from 'react';

//firebase
import { getDatabase, ref as databaseRef, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth"; //registro
import { auth, db, storage } from '../config/Config';
//imagen
import * as ImagePicker from 'expo-image-picker';
import { ref as storageRef, uploadBytes } from "firebase/storage";

const RegistroScreen = ({navigation}:any) => {
  const [nick, setNick] = useState('');
  const [pais, setpais] = useState('')
  const [fechaDeNacimiento, setfechaDeNacimiento] = useState('')
  const [correo, setCorreo] = useState('');  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState("");

  function datosUsuario() {
    set(databaseRef(db, 'usuarios/' + correo.replace('.', ',')), { // Usando 'correo' como clave primaria y reemplazando '.' por ',' porque firebase no permite puntos
      nick: nick,
      pais: pais,
      fechaDeNacimiento: fechaDeNacimiento,
      correo: correo,
    });
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  async function subir() {
    const sRef = storageRef(storage, 'FotoUsuario/' + nick); // se usar el nick como nombre de la imagen
    const response = await fetch(image);
    const blob = await response.blob();
    uploadBytes(sRef, blob).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    }).catch((error) => {
      console.error(error);
    });
  }

  function registro() {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    createUserWithEmailAndPassword(auth, correo, password)
      .then((userCredential) => {
        const user = userCredential.user;
        datosUsuario();
        if (image) {
          subir()
            .then(() => {
              navigation.navigate("Login");
            })
            .catch((error) => {
              console.error("Error uploading image: ", error);
              Alert.alert('Error', 'Hubo un problema al subir la imagen.');
            });
        } else {
          navigation.navigate("Login");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case 'auth/email-already-in-use':
            Alert.alert('Error', 'El correo ya existe');
            break;
          case 'auth/invalid-email':
            Alert.alert('Error', 'Correo invalido');
            break;
          case 'auth/missing-password':
            Alert.alert('Error', 'Ingrese una contraseña de 6 dígitos');
            break;
        }
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
          value={pais}
          onChangeText={setpais}
        />
        <Button title="Subir una foto suya" onPress={pickImage} />
        <TextInput
          style={styles.input}
          placeholder="Fecha de nacimiento"
          placeholderTextColor="#aaa"
          value={fechaDeNacimiento}
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

        <TouchableOpacity style={styles.button} onPress={registro}>
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
