import { StyleSheet,Text,View,Button } from "react-native";
import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import Animated, {useSharedValue,useAnimatedStyle,withSpring,} from 'react-native-reanimated';
import { Gesture, GestureDetector,GestureHandlerRootView } from 'react-native-gesture-handler';
import MyButton from "../components/MyButton";

const Reveal = ({navigation}) => {
    const { jogadores } = useApp();
    const cardY = useSharedValue(0);
    const startY = useSharedValue(0);
    const ultY = useSharedValue(0);
    const [jogadorAtual, setJogadorAtual] = useState(0);
    const cardStyle = useAnimatedStyle(() => {
    return {
        transform: [
            { translateY: cardY.value }
        ]
    };
});

    const gesture = Gesture.Pan()
    .onStart(() => {
        startY.value = cardY.value;
    })
    .onUpdate((event) => {
        cardY.value = startY.value + event.translationY;
        ultY.value = event.translationY;
    })
    .onEnd(() => {
        cardY.value = withSpring(
            ultY.value < 0 ? -300 : 0
        );
    });

    return(
    <View style={styles.container}>

        <Text style={styles.titulo}>
            REVELAÇÃO
        </Text>

        <Text style={styles.jogadorNome}>
            {jogadores[jogadorAtual]?.nome}
        </Text>

        <Text style={styles.instrucao}>
            Deslize o cartão para cima
        </Text>

        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.card, cardStyle]}>

                {jogadores.length > 0 && (
                    <View style={styles.conteudoCard}>

                        <Text style={styles.textoFuncao}>
                            Você é
                        </Text>

                        <Text style={styles.funcao}>
                            {jogadores[jogadorAtual].funcao}
                        </Text>

                        <View style={styles.linha} />

                        <Text style={styles.textoAliados}>
                            Seus aliados são:
                        </Text>

                        <View style={styles.listaAliados}>
                            {jogadores
                                .filter((jogador, index) =>
                                    index != jogadorAtual &&
                                    jogador.partido == jogadores[jogadorAtual].funcao
                                )
                                .map(jogador => (
                                    <Text
                                        key={jogador.nome}
                                        style={styles.aliado}
                                    >
                                        {jogador.nome} - {jogador.funcao}
                                    </Text>
                                ))
                            }
                        </View>

                    </View>
                )}

            </Animated.View>
        </GestureDetector>

        <View style={styles.botaoContainer}>
            <MyButton
                title="Vamos pro próximo jogador"
                onPress={proxjog}
            />
        </View>

    </View>
)
    function proxjog(){
        if(jogadorAtual < jogadores.length-1){
            setJogadorAtual(prev => prev + 1);
            cardY.value = withSpring(0);
        }
        else navigation.navigate("Table")
    }
}

export default Reveal

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F4C430",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },

    titulo: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#3A2A00",
        marginBottom: 8,
    },

    jogadorNome: {
        fontSize: 23,
        fontWeight: "bold",
        color: "#5C4A00",
        marginBottom: 15,
    },

    instrucao: {
        fontSize: 16,
        color: "#6B5700",
        marginBottom: 20,
    },

    card: {
        position: "absolute",
        bottom: -300,
        width: "100%",
        height: "50%",
        backgroundColor: "#FFF8DC",
        alignItems: "center",
        justifyContent: "center",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        elevation: 15,
        zIndex: 10,
    },

    conteudoCard: {
        width: "85%",
        alignItems: "center",
    },

    textoFuncao: {
        fontSize: 18,
        color: "#6B5700",
        marginBottom: 5,
    },

    funcao: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#3A2A00",
        textAlign: "center",
        marginBottom: 20,
    },

    linha: {
        width: "80%",
        height: 2,
        backgroundColor: "#D6B529",
        marginBottom: 20,
    },

    textoAliados: {
        fontSize: 19,
        fontWeight: "bold",
        color: "#4A3A00",
        marginBottom: 12,
    },

    listaAliados: {
        alignItems: "center",
    },

    aliado: {
        fontSize: 17,
        color: "#5C4A00",
        marginVertical: 4,
        textAlign: "center",
    },

    botaoContainer: {
        position: "absolute",
        top: 80,
        width: "90%",
        zIndex: 5,
    },

});