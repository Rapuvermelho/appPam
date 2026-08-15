import { StyleSheet,Text,View,Button,Dimensions,Pressable } from "react-native";
import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import MyButton from "../components/MyButton";

const Table = ({navigation}) => {

    const { jogadores,setJogadores } = useApp();
    const [jogadorAtual, setJogadorAtual] = useState(0);
    const {cartas} = useApp();
    const [presidenteNome, setPresidenteNome] = useState("");
    const [chancelerNome, setChancelerNome] = useState("");

    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>Mesa</Text>

            <View style={styles.playersContainer}>
                {jogadores.map((jogador, index) => (
                    <Pressable
                        key={index}
                        style={[
                            styles.jogador,
                            jogador.pres && styles.presidente,
                           jogador.chan && styles.chanceler,
                            index == jogadorAtual && styles.selecionado,
                        ]}
                        onPress={()=> setJogadorAtual(index)}
                    >
                        <Text>{jogador.nome}</Text>
                    </Pressable>
                ))}
            </View>

            <MyButton
                title="Escolher Presidente"
                onPress={presidente}
            />

            <MyButton
                title="Escolher Chanceler"
                onPress={chanceler}
            />

            <MyButton
                title={`Vejam as cartas presidente ${presidenteNome} e chanceler ${chancelerNome}`}
                onPress={()=> navigation.navigate("Politics")}
            />

            <Text>No momento já se passaram {cartas.LibsPass} leis liberais,faltam {5-cartas.LibsPass}</Text>
            <Text>No momento já se passaram {cartas.FascPass} leis fascistas,faltam {6-cartas.FascPass}</Text>
            {cartas.Comu > 0 &&(
            <Text>No momento já se passaram {cartas.ComuPass} leis comunistas,faltam {6-cartas.ComuPass}
            </Text>)}
            {cartas.Anar > 0 &&(
            <Text>No momento já se passaram {cartas.AnarPass} leis anarquistas,faltam {3-cartas.AnarPass}
            </Text>)}
            

        </View>
    );
    function presidente(){
        const novosJogadores = [...jogadores];
        for(let i = 0;i < novosJogadores.length ;i++){
            if(novosJogadores[i].pres == true){
                    novosJogadores[i] = {
                    ...novosJogadores[i],
                    pres:false
            }}
        }
        novosJogadores[jogadorAtual] = {
            ...novosJogadores[jogadorAtual],
            pres: true
        };
        setPresidenteNome(novosJogadores[jogadorAtual].nome);
    setJogadores(novosJogadores);
    }
    function chanceler(){
        const novosJogadores = [...jogadores];
        for(let i = 0;i < novosJogadores.length ;i++){
            if(novosJogadores[i].chan == true){
                novosJogadores[i] = {
                    ...novosJogadores[i],
                    chan:false
                }
            }
        }
        novosJogadores[jogadorAtual] = {
            ...novosJogadores[jogadorAtual],
            chan: true
    };
    setChancelerNome(novosJogadores[jogadorAtual].nome);
    setJogadores(novosJogadores);
    };
}

export default Table

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
    },

    titulo: {
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
    presidente: {
        backgroundColor: 'gold',
    },
    chanceler: {
        backgroundColor: 'lightblue',
    },  
    selecionado: {
        borderWidth: 4,
        borderColor: 'red',
    },
});