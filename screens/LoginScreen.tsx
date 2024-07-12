import { ImageBackground, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function LoginScreen({navigation} : any) {
    return (
      <ImageBackground 
      source={{uri:"https://img.freepik.com/premium-vector/illustration-cobra-snake_167995-436.jpg?w=740"}}
      style={styles.container}
      >

        <Text style={{ color:'#fff', fontSize:60, fontWeight:'bold', marginBottom:30}}>Log in</Text>
    
        <TextInput
          placeholder='Usuario o Email'
          placeholderTextColor={'#fff'}
          style={styles.input}
        />

        <TextInput
          placeholder='Contraseña'
          placeholderTextColor={'white'}
          secureTextEntry={true}
          style={styles.input}
          />

        <TouchableOpacity style={{marginTop:20}}>
          <Text style={{color:'#fff',fontSize:16}}>Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} 
                          >
          <Text style={styles.buttonText} >Ingresar</Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row', marginTop:35}}>
          <Text style={{color:'#fff', fontSize:16}}>Todavia no tienes una cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{color:'#3316C2', fontSize:16}}>Registrate</Text>
          </TouchableOpacity>
        </View>
      <StatusBar/>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
   
  
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    
  },
  
  input:{

    height:50,
    width:'80%',
    marginBottom:10,    
    marginTop:10,
    borderRadius:40,
    paddingHorizontal:15,
    color:'white',
    borderColor:'#fff',
    fontSize:15,
    borderBottomWidth:2,
    
    
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