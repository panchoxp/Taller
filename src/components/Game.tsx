import * as React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Switch, Text, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Colors } from '../styles/Colors';
import { Coordenadas, Direccion, GestureEventType } from '../types/types';
import Snake from './Snake';
import { checkGameOver } from '../utils/checkGameOver';
import Food from './Food';
import { checkEatsFood } from '../utils/checkEatsFood';
import { randomFoodPosition } from '../utils/randomFoodPosition';
import Header from './Header';
import { Audio } from 'expo-av';


const SNAKE_INITIAL_POSITION = [{x:5, y:5}];
const FOOD_INITIAL_POSITION = {x:5, y:20};
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 63};
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;



export default function Game(): JSX.Element {

 
    const [sound, setSound] = React.useState();

    async function playSound() {
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync( require('../../assets/sounds/eatSound.mp3')
      );
      setSound(sound);
  
      console.log('Playing Sound');
      await sound.playAsync();
    }
  
    React.useEffect(() => {
      return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync();
          }
        : undefined;
    }, [sound]);



    const [direccion, setDireccion] = React.useState<Direccion>(Direccion.Right);
    
    //POSCION INICIAL DE LA SNAKE Y LA COMIDA    
    const [snake, setSnake] = React.useState<Coordenadas[]>(SNAKE_INITIAL_POSITION);
    const [food, setFood] = React.useState<Coordenadas>(FOOD_INITIAL_POSITION);

    //VARIABLE PARA CUANDO EL JUEGO TERMINE
    const [isGameOver, setIsGameOver] = React.useState<boolean>(false);
    const [isPaused, setIsPaused] = React.useState<boolean>(false);


    const [score, setScore] = React.useState<number>(0);


    React.useEffect( () => {
        if(!isGameOver){
            const intervalID = setInterval( () => {
                !isPaused && moveSnake();  
            }, MOVE_INTERVAL );
            return () => clearInterval(intervalID);
            
        }
    }, [isGameOver, snake, isPaused]);

    const moveSnake = ()=>{
        const snakeHead = snake[0];
        const newHead = { ...snakeHead}; 

        //CHECK DE SI EL JUEGO TERMINO
        if (checkGameOver(snakeHead, GAME_BOUNDS)){
            
            setIsGameOver((prev)=>!prev);
            return;
        }

        //MIRAR LA DIRECCION
        switch(direccion){
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
        if(checkEatsFood(newHead, food, 2)){
            playSound
            setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax))
            setSnake([newHead, ...snake]);
            setScore(score + SCORE_INCREMENT);
        }else {
            //MOVER LA SNAKE
            setSnake([newHead, ...snake.slice(0, -1)]);
        }   
    };


    const handleGesture = (event: GestureEventType) => {
        
        const{ translationX, translationY } = event.nativeEvent;
        //console.log(direccion);

        if (Math.abs(translationX) > Math.abs(translationY)){
            if (translationX > 0){
                setDireccion(Direccion.Right)
            }else {
                setDireccion(Direccion.Left)
            }
        }else {
            if (translationY > 0){
                setDireccion(Direccion.Down)
            }else{
                setDireccion(Direccion.Up)
            }
        }
    } 

    //REINICIAR EL JUEGO
    const reloadGame = () => {
        setSnake(SNAKE_INITIAL_POSITION);
        setFood(FOOD_INITIAL_POSITION);
        setIsGameOver(false);
        setScore(0);
        setDireccion(Direccion.Right);
        setIsPaused:(false);
    }

    
    const pauseGame = ()=>{
        setIsPaused(!isPaused);
    }

    return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <SafeAreaView style={styles.container}>

                <Header 
                    reloadGame={reloadGame}
                    isPauseD = {isPaused}
                    pauseGame={pauseGame}
                >
                    <Text>{score}</Text>
                </Header>

               <View style={styles.limites}>
                    
                    <Snake snake={snake}/>
                    <Food x = {food.x} y={food.y}/>
               </View>

               
            </SafeAreaView>
            <StatusBar/>
        </PanGestureHandler>
    )
}

const styles = StyleSheet.create ({

    container:{
        flex:1,
        backgroundColor:Colors.primary,
    },

    limites:{
        flex:1,
        borderWidth:12,
        borderColor:Colors.primary,
        backgroundColor:Colors.background,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30
    }

}) 