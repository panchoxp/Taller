import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'


export default function OpcionesScreen({ navigation }: any) {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Opciones</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title="Jugar"
                    onPress={() => navigation.navigate('Game')}
                    color="rgb(0, 216, 255)"
                />
                <Button
                    title="Ver-Editar Datos"
                    onPress={() => navigation.navigate('DatosUsuario')}
                    color="rgb(0, 216, 255)"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'space-around',
        height: 100,
    },
})
