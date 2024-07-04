import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function LoginScreen() {
    return (
      <ImageBackground 
      source={{uri:"https://images.pexels.com/photos/5935788/pexels-photo-5935788.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}}
      style={styles.container}
      >

        <Text style={{ color:'#0df2c9', fontSize:60, fontWeight:'bold', marginBottom:30}}>Log in</Text>
    
        <TextInput
          placeholder='User or Email'
          placeholderTextColor={'white'}
          style={styles.input}
        />

        <TextInput
          placeholder='Password'
          placeholderTextColor={'white'}
          secureTextEntry={true}
          style={styles.input}
          />

        <TouchableOpacity>
          <Text style={{color:'#3169E9'}}>Did you forget your password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} 
                          onPress={()=> navigation.navigate('BottonTab')}>
          <Text style={styles.buttonText}>Log in</Text>
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
    backgroundColor:'#0004',
    height:50,
    width:'80%',
    marginBottom:10,    
    marginTop:10,
    borderRadius:40,
    paddingHorizontal:15,
    color:'white'
  },
  
  button:{
    backgroundColor:'#0df2c9',
    borderRadius:20,
    padding:10,
    width:'50%',
    marginTop:60
  },

  buttonText:{
    color:'#000',
    fontSize:22,
    textAlign:'center',

  }
})