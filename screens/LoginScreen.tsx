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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})