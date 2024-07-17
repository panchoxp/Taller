import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { ref, onValue, update } from 'firebase/database';
import { auth, db } from '../config/Config';
import { Ionicons } from '@expo/vector-icons';

const VerEditarDatosScreen = ({ navigation }: any) => {
    const [nick, setNick] = useState('');
    const [pais, setPais] = useState('');
    const [fechaDeNacimiento, setFechaDeNacimiento] = useState('');
    const [correo, setCorreo] = useState('');
    const [puntaje, setPuntaje] = useState(0);
    const [imagen, setImagen] = useState('');

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const email:any = user.email;
            setCorreo(email);
            leerUsuario(email);
        }
    }, []);

    function leerUsuario(email: any) {
        const userRef = ref(db, 'usuarios/' + email.replace('.', ','));

        onValue(userRef, (snapshot) => {
            const data = snapshot.val();

            if (data) {
                setNick(data.nick);
                setPais(data.pais);
                setFechaDeNacimiento(data.fechaDeNacimiento);
                setPuntaje(data.puntaje);
                setImagen(data.imagen); // Asegúrate de que 'imagen' coincida con la clave en tu estructura de datos
            } else {
                Alert.alert('Error', 'No se encontraron datos para este usuario.');
            }
        });
    }

    function editar() {
        update(ref(db, 'usuarios/' + correo.replace('.', ',')), {
            nick: nick,
            pais: pais,
            fechaDeNacimiento: fechaDeNacimiento,
            imagen: imagen, // Asegúrate de que 'imagen' coincida con la clave en tu estructura de datos
        }).then(() => {
            Alert.alert('Éxito', 'Datos actualizados correctamente.');
        }).catch((error) => {
            console.error('Error al actualizar datos:', error);
            Alert.alert('Error', 'Hubo un problema al actualizar los datos.');
        });
    }

    return (
        <ImageBackground
            source={{ uri: "https://cdn.leonardo.ai/users/313d1b5b-609c-4010-9680-3d090077aa96/generations/1216f7f6-453e-41ef-a2a2-4f25332ceb43/Default_A_vibrant_3D_logotype_featuring_a_stylized_watermelon_1.jpg" }}
            style={styles.backgroundImage}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <View style={styles.contentBack}>
                        <TouchableOpacity
                            style={styles.touchBack}
                            onPress={() => navigation.navigate("Opciones")}
                        >
                            <Ionicons name="arrow-back-circle" size={40} color={"#4fab36"} />
                            <Text style={{ color: "#4fab36", fontSize: 17 }}> Volver</Text>
                        </TouchableOpacity>
                        <Text style={styles.txtScore}>🍉 {puntaje}</Text>
                        <TouchableOpacity
                            style={styles.touchBack}
                            onPress={() => navigation.navigate("DatosUsuario")}
                        >
                            {imagen ? (
                                <Image source={{ uri: imagen }} style={styles.profileImage} />
                            ) : (
                                <Ionicons name="person-circle-outline" size={40} color={"#4fab36"} />
                            )}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Nick:</Text>
                        <TextInput
                            placeholder='Nick'
                            style={styles.input}
                            onChangeText={setNick}
                            value={nick}
                        />
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>País:</Text>
                        <TextInput
                            placeholder='País'
                            style={styles.input}
                            onChangeText={setPais}
                            value={pais}
                        />
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Fecha de Nacimiento:</Text>
                        <TextInput
                            placeholder='Fecha de Nacimiento'
                            style={styles.input}
                            onChangeText={setFechaDeNacimiento}
                            value={fechaDeNacimiento}
                        />
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Correo:</Text>
                        <TextInput
                            placeholder='Correo'
                            style={styles.input}
                            value={correo}
                            editable={false}
                        />
                    </View>

                    <Button title='Editar' color={'#4fab36'} onPress={editar} />
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
        color: '#fff',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        width: 120,
        marginRight: 10,
        textAlign: 'right',
        color: '#4fab36',
        fontSize: 18,
    },
    input: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        height: 50,
        borderRadius: 5,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#24621d',
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
    txtScore: {
        fontSize: 18,
        color: '#4fab36',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
});

export default VerEditarDatosScreen;
