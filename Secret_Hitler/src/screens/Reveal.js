import { StyleSheet,Text,View,Button } from "react-native";
import React from "react";
import { useApp } from "../context/AppContext";

const Reveal = ({navigation}) => {
    const { nome } = useApp();

    return(
    <View style={styles.container}>
        <Text>Reveal</Text>
        <Text>Player: {nome}</Text>
    </View>
    )
}

export default Reveal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});