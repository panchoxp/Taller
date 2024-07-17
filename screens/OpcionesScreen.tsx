import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { signOut } from "firebase/auth";
import { auth } from '../config/Config';

const OpcionesScreen = ({ navigation }: any) => {
    
    function cerrarSesion() {
        signOut(auth).then(() => {
            navigation.navigate("Login");
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <ImageBackground
            source={{ uri: 'https://cdn.leonardo.ai/users/313d1b5b-609c-4010-9680-3d090077aa96/generations/1216f7f6-453e-41ef-a2a2-4f25332ceb43/Default_A_vibrant_3D_logotype_featuring_a_stylized_watermelon_1.jpg' }}
            style={styles.backgroundImage}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>                
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: "#4fab36" }]}
                            onPress={() => navigation.navigate('Game')}
                        >
                            <Text style={styles.buttonText}>Jugar</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: "#4fab36" }]}
                            onPress={() => navigation.navigate('DatosUsuario')}
                        >
                            <Text style={styles.buttonText}>Ver y Editar Datos</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: "#4fab36" }]}
                            onPress={cerrarSesion}
                        >
                            <Text style={styles.buttonText}>Cerrar sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'space-around',
        paddingVertical: 20,
    },
    button: {
        width: '100%',
        height: 60,
        borderRadius: 30, 
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10, 
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default OpcionesScreen;
