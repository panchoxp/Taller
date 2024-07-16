import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { ref, onValue, update } from 'firebase/database';
import { auth, db } from '../config/Config';

export default function VerEditarDatosScreen({ navigation }) {
    const [nick, setNick] = useState('');
    const [pais, setPais] = useState('');
    const [fechaDeNacimiento, setFechaDeNacimiento] = useState('');
    const [correo, setCorreo] = useState('');
    const [puntaje, setpuntaje] = useState(0);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const email = user.email; // Obtener el correo electrónico del usuario
            setCorreo(email); // Almacenar el correo electrónico en el estado 'correo'
            leerUsuario(email); // Llamar a la función para leer los datos del usuario basado en el correo
        }
    }, []);

    // Función para leer los datos del usuario basado en el correo
    function leerUsuario(email) {
        const userRef = ref(db, 'usuarios/' + email.replace('.', ',')); // Ajustar el correo para la referencia en Firebase

        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            //console.log(data.puntaje);
            
            if (data) {
                setNick(data.nick);
                setPais(data.pais);
                setFechaDeNacimiento(data.fechaDeNacimiento);
                setpuntaje(data.puntaje       
                )
                console.log(puntaje)
                //setImage(data.image); // Si tienes un campo para imagen
            } else {
                Alert.alert('Error', 'No se encontraron datos para este usuario.');
            }
        });
    }

    // Función para editar los datos del usuario
    function editar() {
        update(ref(db, 'usuarios/' + correo.replace('.', ',')), { // Ajustar la referencia para la actualización en Firebase
            nick: nick,
            pais: pais,
            fechaDeNacimiento: fechaDeNacimiento,
            puntaje:puntaje
        }).then(() => {
            Alert.alert('Éxito', 'Datos actualizados correctamente.');
        }).catch((error) => {
            console.error('Error al actualizar datos:', error);
            Alert.alert('Error', 'Hubo un problema al actualizar los datos.');
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ver y Editar Datos</Text>

            <TextInput
                placeholder='Nick'
                style={styles.input}
                onChangeText={setNick}
                value={nick}
            />
            <TextInput
                placeholder='Pais'
                style={styles.input}
                onChangeText={setPais}
                value={pais}
            />
            <TextInput
                placeholder='Fecha de Nacimiento'
                style={styles.input}
                onChangeText={setFechaDeNacimiento}
                value={fechaDeNacimiento}
                
            />
            <TextInput
                placeholder='Correo'
                style={styles.input}
                value={correo} // Mostrar el correo electrónico obtenido
                editable={false} // El correo no es editable
            />

            <Text>{puntaje}</Text>
            {/* Puedes incluir el campo para la imagen si lo necesitas */}
            {/* <TextInput
                placeholder='URL de Imagen'
                style={styles.input}
                onChangeText={setImage}
                value={image}
            /> */}

            {/* Botón para editar, aquí puedes usar editar() cuando lo implementes */}
            <Button title='Editar' color={'green'} onPress={() => editar()} />
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
    input: {
        backgroundColor: '#ddd',
        height: 50,
        width: '80%',
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 40,
        paddingHorizontal: 15,
        color: '#000',
        borderColor: 'rgb(86, 0, 136)',
        fontSize: 17,
    },
});


