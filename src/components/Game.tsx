import * as React from "react";
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from 'react';
import { PanGestureHandler } from "react-native-gesture-handler";
import { Colors } from "../styles/Colors";
import { Coordenadas, Direccion, GestureEventType } from "../types/types";
import Snake from "./Snake";
import { checkGameOver } from "../utils/checkGameOver";
import Food from "./Food";
import { checkEatsFood } from "../utils/checkEatsFood";
import { randomFoodPosition } from "../utils/randomFoodPosition";
import Header from "./Header";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { ref, update } from "firebase/database";
import { auth, db } from "../../config/Config";

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 54 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;
const VOLUME = 1.0;

export default function Game({ navigation }: any): JSX.Element {

  const [correo, setCorreo] = React.useState('');
  const [sound, setSound] = React.useState<Audio.Sound | null>(null);

  //FUNCION PARA AGREGAR UN SONIDO
  async function playSound() {
    //console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/eatSound.mp3")
    );
    setSound(sound);

    //console.log("Playing Sound");
    await sound.setVolumeAsync(VOLUME);
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
        //console.log("Unloading Sound");
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  //FUNCION PARA AGREGAR UN SONIDO
  async function playSound2() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/collisionSound.mp3")
    );
    setSound(sound);

    //console.log("Playing Sound");
    await sound.setVolumeAsync(VOLUME);
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
        //console.log("Unloading Sound");
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  const [direccion, setDireccion] = React.useState<Direccion>(Direccion.Right);

  //POSCION INICIAL DE LA SNAKE Y LA COMIDA
  const [snake, setSnake] = React.useState<Coordenadas[]>(
    SNAKE_INITIAL_POSITION
  );
  const [food, setFood] = React.useState<Coordenadas>(FOOD_INITIAL_POSITION);

  //VARIABLE PARA CUANDO EL JUEGO TERMINE
  const [isGameOver, setIsGameOver] = React.useState<boolean>(false);
  const [isPaused, setIsPaused] = React.useState<boolean>(false);

  const [score, setScore] = React.useState<number>(0);

  React.useEffect(() => {
    if (!isGameOver) {
      const intervalID = setInterval(() => {
        !isPaused && moveSnake();
      }, MOVE_INTERVAL);
      return () => clearInterval(intervalID);
    }
  }, [isGameOver, snake, isPaused]);

  const moveSnake = () => {
    const snakeHead = snake[0];
    const newHead = { ...snakeHead };

    //CHECK DE SI EL JUEGO TERMINO
    if (checkGameOver(snakeHead, GAME_BOUNDS)) {
      console.log(setIsGameOver);
      setIsGameOver((prev) => !prev);
      playSound2();
      return;
    }

    const checkCollisionWithBody = (head: Coordenadas, body: Coordenadas[]) => {
      return body.some(
        (segment) => segment.x === head.x && segment.y === head.y
      );
    };

    if (checkCollisionWithBody(newHead, snake.slice(1))) {
      setIsGameOver(true);
      playSound2();
      return;
    }

    //MIRAR LA DIRECCION
    switch (direccion) {
      case Direccion.Up:
        newHead.y -= 1;
        break;
      case Direccion.Down:
        newHead.y += 1;
        break;
      case Direccion.Left:
        newHead.x -= 1;
        break;
      case Direccion.Right:
        newHead.x += 1;
        break;
      default:
        break;
    }

    //MIRAR SI SE COME LA COMIDA
    if (checkEatsFood(newHead, food, 2)) {
      playSound();
      setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
      setSnake([newHead, ...snake]);
      setScore(score + SCORE_INCREMENT);
    } else {
      //MOVER LA SNAKE
      setSnake([newHead, ...snake.slice(0, -1)]);
    }
  };

  /////
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const email: any = user.email; // Obtener el correo electrónico del usuario
      setCorreo(email); // Almacenar el correo electrónico en el estado 'correo'
      // Llamar a la función para leer los datos del usuario basado en el correo
    }
  }, []);

  function editar() {
    update(ref(db, 'usuarios/' + correo.replace('.', ',')), { // Ajustar la referencia para la actualización en Firebase
      puntaje: score
    })

  }
  useEffect(() => {
    editar();
  }, [score])

  const handleGesture = (event: GestureEventType) => {
    const { translationX, translationY } = event.nativeEvent;
    //console.log(direccion);

    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        setDireccion(Direccion.Right);
      } else {
        setDireccion(Direccion.Left);
      }
    } else {
      if (translationY > 0) {
        setDireccion(Direccion.Down);
      } else {
        setDireccion(Direccion.Up);
      }
    }
  };

  //REINICIAR EL JUEGO
  const reloadGame = () => {
    setSnake(SNAKE_INITIAL_POSITION);
    setFood(FOOD_INITIAL_POSITION);
    setIsGameOver(false);
    setScore(0);
    setDireccion(Direccion.Right);
    setIsPaused: false;
  };

  const pauseGame = () => {
    setIsPaused(!isPaused);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.contentBack}>
        <TouchableOpacity
          style={styles.touchBack}
          onPress={() => navigation.navigate("Opciones")}
        >
          <Ionicons name="arrow-back-circle" size={40} color={"#000"} />
          <Text style={{ color: "#000", fontSize: 17 }}> Volver</Text>
        </TouchableOpacity>
        <Text style={styles.txtScore}>🍉 {score}</Text>
        <TouchableOpacity
          style={styles.touchBack}
          onPress={() => navigation.navigate("DatosUsuario")}
        >
          <Ionicons name="person-circle-outline" size={40} color={"#000"} />
        </TouchableOpacity>
      </View>

      <PanGestureHandler onGestureEvent={handleGesture}>
        <SafeAreaView style={styles.container}>
          <View style={styles.limites}>
            <Snake snake={snake} />
            <Food x={food.x} y={food.y} />
          </View>
        </SafeAreaView>
      </PanGestureHandler>
      <Header
        reloadGame={reloadGame}
        isPauseD={isPaused}
        pauseGame={pauseGame}
      ></Header>
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  limites: {
    flex: 1,
    borderWidth: 12,
    borderColor: Colors.primary,
    backgroundColor: "#ffff",
  },

  txtScore: {
    color: "#000",
    fontSize: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 20,
    marginRight: 25,
    flexDirection: "row",
    alignItems: "center",
  },

  contentBack: {
    flex: 0.15,
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    borderColor: Colors.primary,
    backgroundColor: Colors.background,
  },

  touchBack: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 20,
    marginLeft: 15,
    flexDirection: "row",
    alignItems: "center",
  },
});
