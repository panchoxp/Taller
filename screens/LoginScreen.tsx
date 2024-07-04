import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function LoginScreen() {
    return (
      <ImageBackground 
      source={{uri:"https://img.freepik.com/fotos-premium/fondo-pantalla-juegos-coloridos-call-of-duty-4k_669273-265.jpg"}}
      style={styles.container}
      >

        <Text style={{ color:'#0df2c9', fontSize:60, fontWeight:'bold', marginBottom:30}}>Login</Text>
    
        <TextInput
          placeholder='Usuario o Email'
          placeholderTextColor={'white'}
          style={styles.input}
        />

        <TextInput
          placeholder='Contraseña'
          placeholderTextColor={'white'}
          secureTextEntry={true}
          style={styles.input}
          />

        <TouchableOpacity>
          <Text style={{color:'rgb(rgb(255, 63, rgb(212, 255, 0)), 255, 0)',fontSize:16}}>Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} 
                          >
          <Text style={styles.buttonText} >Ingresar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} 
                          >
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

    </ImageBackground>
  )
}

const styles = StyleSheet.create({
   
  
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
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
})