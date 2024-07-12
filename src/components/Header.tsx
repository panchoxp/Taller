import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../styles/Colors";
import { FontAwesome } from "@expo/vector-icons";

interface HeaderProps {
  reloadGame: () => void;
  pauseGame: () => void;
  children: JSX.Element;
  isPauseD: boolean;
}

export default function Header({
  children,
  reloadGame,
  pauseGame,
  isPauseD,
}: HeaderProps): JSX.Element {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={reloadGame}>
        <Ionicons name="reload-circle" size={40} color={"#000"} />
        <Text style={styles.txt}>Reset</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={pauseGame}>
        <FontAwesome
          name={isPauseD ? "play-circle" : "pause-circle"}
          size={40}
          color={"#000"}
        />
        <Text style={styles.txt}>Pause</Text>
      </TouchableOpacity>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: Colors.primary,
    backgroundColor:Colors.background
  },

  txt: {
    color: "#000",
  },
});
