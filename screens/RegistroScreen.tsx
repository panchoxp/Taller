import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const LoginScreen = ({navigation}: any) => {
  const [nick, setNick] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>

        <View style={{flexDirection:'row', marginTop:35}}>
        <Text style={{color:'#fff', fontSize:16}}>Ya tienes una cuenta ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{color:'#145AE5', fontSize:16}}> Iniciar sesion</Text>
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
    justifyContent: 'center',
  },
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input:{
    backgroundColor:'#0009',
    height:50,
    width:'80%',
    marginBottom:10,    
    marginTop:10,
    borderRadius:40,
    paddingHorizontal:15,
    color:'white',
    borderColor:'rgb(86, 0, 136)',
    fontSize:17
  },
  button:{
    backgroundColor:'rgb(0, 216, 255)',
    borderRadius:20,
    padding:13,
    width:'50%',
    marginTop:20
  },
  buttonText:{
    color:'#000',
    fontSize:22,
    textAlign:'center',

  }
});

export default LoginScreen;