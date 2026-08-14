import { StyleSheet,Text,View,Button,Dimensions } from "react-native";
import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import MyButton from "../components/MyButton";

const Table = ({navigation}) => {

    const { jogadores } = useApp();

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Mesa</Text>

            <View style={styles.playersContainer}>
                {jogadores.map((jogador, index) => (
                    <View
                        key={index}
                        style={styles.jogador}
                    >
                        <Text>{jogador.nome}</Text>
                    </View>
                ))}
            </View>

            <Button
                title="Reveal"
                onPress={() => navigation.navigate("Reveal")}
            />

        </View>
    );
};

export default Table

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
    },

    title: {
        fontSize: 25,
        marginTop: 30,
        marginBottom: 30,
    },

    playersContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },

    jogador: {
        width: '40%',
        height: 60,
        margin: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});