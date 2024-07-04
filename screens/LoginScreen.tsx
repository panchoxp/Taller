import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <Text>login</Text>
        </View>
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