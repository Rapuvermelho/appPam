import { StyleSheet,Text,View,Button } from "react-native";
import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import Animated, {useSharedValue,useAnimatedStyle,withSpring,} from 'react-native-reanimated';
import { Gesture, GestureDetector,GestureHandlerRootView } from 'react-native-gesture-handler';

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
      <GestureDetector gesture={gesture}>
    <Animated.View style={[styles.card, cardStyle]}>
        {jogadores.length > 0 && (
            <Text>Você é {jogadores[jogadorAtual].funcao}{"\n"}
                Seus aliados são:{"\n"}
                {jogadores
                .filter((jogador, index) =>
                    index !== jogadorAtual &&
                    jogador.partido === jogadores[jogadorAtual].partido
                )
                .map(jogador => (
                    <Text key={jogador.nome}>
                        {jogador.nome} - {jogador.funcao}
                    </Text>
                ))
            } 
            </Text>
        )}
    </Animated.View>
</GestureDetector>
        <Text>Veja sua Função {jogadores[jogadorAtual].nome}</Text>
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
  card: {
    position: 'absolute',
    bottom: -300,
    width: '100%',
    height: '50%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    zIndex: 10,
},
});