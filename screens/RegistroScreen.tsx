import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
import React, { useState } from 'react';

//firebase
import { getDatabase, ref as databaseRef, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth"; //registro
import { auth, db, storage } from '../config/Config';
import { Ionicons } from '@expo/vector-icons';
//imagen
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';

const RegistroScreen = ({ navigation }: any) => {
  const [nick, setNick] = useState('');
  const [pais, setpais] = useState('')
  const [fechaDeNacimiento, setfechaDeNacimiento] = useState('')
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState<string | null>(null);

  function datosUsuario() {
    set(databaseRef(db, 'usuarios/' + correo.replace('.', ',')), { // Usando 'correo' como clave primaria y reemplazando '.' por ',' porque firebase no permite puntos
      nick: nick,
      pais: pais,
      fechaDeNacimiento: fechaDeNacimiento,
      correo: correo,
      puntaje: 0,
      imagen: image || '',
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

  async function subirImagen(nick: string) {
    if (!image) {
      console.error('No se ha seleccionado ninguna imagen.');
      return;
    }
    const sRef = storageRef(storage, 'FotoUsuario/' + nick);

    try {
      const response = await fetch(image);
      const blob = await response.blob();
      await uploadBytes(sRef, blob, {
        contentType: 'image/jpg'
      });
      console.log('La imagen se subió con éxito');
      const imageURL = await getDownloadURL(sRef);
      console.log('URL de descarga de la imagen', imageURL);
      guardarURLImagen(imageURL);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al subir la imagen.');
    }
  }
  function guardarURLImagen(url: string) {
    set(databaseRef(db, 'usuarios/' + correo.replace('.', ',')), {
      nick: nick,
      pais: pais,
      fechaDeNacimiento: fechaDeNacimiento,
      correo: correo,
      puntaje: 0,
      imagen: url,
    })
      .then(() => {
        console.log('URL de la imagen guardada en la base de datos.');
      })
      .catch((error) => {
        console.error('Error al guardar URL de la imagen:', error);
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
        subirImagen(nick)
          .then(() => {
            navigation.navigate("Login");
          })
          .catch((error: any) => {
            console.error("Error uploading image: ", error);
            Alert.alert('Error', 'Hubo un problema al subir la imagen.');
          });
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
    <ImageBackground source={{ uri: 'https://cdn.leonardo.ai/users/313d1b5b-609c-4010-9680-3d090077aa96/generations/1216f7f6-453e-41ef-a2a2-4f25332ceb43/Default_A_vibrant_3D_logotype_featuring_a_stylized_watermelon_1.jpg' }} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.contentBack}>
            <TouchableOpacity
              style={styles.touchBack}
              onPress={() => navigation.navigate("Login")}
            >
              <Ionicons name="arrow-back-circle" size={40} color={"#4fab36"} />
              <Text style={{ color: "#4fab36", fontSize: 17 }}> Volver</Text>
            </TouchableOpacity>
          </View>

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
            placeholder="País"
            placeholderTextColor="#aaa"
            value={pais}
            onChangeText={setpais}
          />
          <Button title="Subir una foto suya" color={'#4fab36'} onPress={pickImage} />
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
    color: '#4fab36', // Color del título ajustado para que coincida con VerEditarDatosScreen
  },
  input: {
    backgroundColor: '#f0f0f0',
    height: 50,
    width: '100%',
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#24621d', // Color del texto de entrada ajustado para que coincida con VerEditarDatosScreen
  },
  button: {
    backgroundColor: '#4fab36', // Color del botón ajustado para que coincida con VerEditarDatosScreen
    borderRadius: 10, // Bordes curvos ajustados para que coincidan con VerEditarDatosScreen
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#000', // Color del texto del botón ajustado para que coincida con VerEditarDatosScreen
    fontSize: 18,
  },
  contentBack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  touchBack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default RegistroScreen;