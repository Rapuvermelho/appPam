import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import trofeu from "../../assets/trofeu.jpeg";

const Victory = ({ navigation }) => {
    return(
        <View style={styles.container}>

            <Text style={styles.titulo}>
                PARABÉNS!
            </Text>

            <Text style={styles.subtitulo}>
                Você ganhou o jogo!
            </Text>

            <Image
                source={trofeu}
                style={styles.image}
            />

        </View>
    )
}

export default Victory

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F4C430",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },

    titulo: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#3A2A00",
        marginBottom: 8,
        letterSpacing: 2,
    },

    subtitulo: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#5C4A00",
        marginBottom: 30,
    },

    image: {
        width: 220,
        height: 220,
        borderRadius: 20,
        resizeMode: "cover",

        elevation: 8,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },

});