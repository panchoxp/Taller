import { TouchableOpacity, StyleSheet, View } from "react-native";
import {Ionicons} from "@expo/vector-icons";
import { Colors } from "../styles/Colors";
import {FontAwesome} from "@expo/vector-icons";

interface HeaderProps{
    reloadGame: () => void,
    pauseGame: () => void,
    children:  JSX.Element,
    isPauseD: boolean

}

export default function Header({
    children, 
    reloadGame,
    pauseGame,
    isPauseD

}: HeaderProps): JSX.Element {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={reloadGame}>
                <Ionicons name="reload-circle" size={35} color={"#000"}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={pauseGame}>
                <FontAwesome 
                    name={isPauseD ? "play-circle" : "pause-circle"}
                    size={35}
                    color={"#000"}
                />
            </TouchableOpacity>
            {children}
        </View>
    )
}

const styles = StyleSheet.create ({
    container:{
        flex:0.05,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderColor: Colors.primary,
        borderWidth: 12,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        borderBottomWidth:0,
        padding:15,
        backgroundColor:Colors.background
    }
})