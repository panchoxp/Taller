import { StyleSheet, Text } from "react-native";
import { Coordenadas } from "../types/types";

//function getRandomFruitEmoji(){
    //const fruitEmojis = ["🍎","🍇","🍉","🍋","🍑","🍒"];
    //const randomIndex = Math.floor(Math.random() * fruitEmojis.length);
    //return fruitEmojis[randomIndex];
//}

export default function Food({x, y}: Coordenadas): JSX.Element {
    return <Text style = {[{ top: y * 10, left: x * 10}, styles.food]} >🍉</Text>
}

const styles = StyleSheet.create ({
    food:{
       width:30,
       height:30,
       borderRadius:15,
       position:'absolute',
       fontSize: 25, 
       textAlign: 'center', 
       lineHeight: 30,  
    }
})