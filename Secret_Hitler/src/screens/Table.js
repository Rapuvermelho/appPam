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

        <Text style={styles.titulo}>
            Mesa
        </Text>

       
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
                    onPress={() => setJogadorAtual(index)}
                >
                    <Text style={styles.jogadorTexto}>
                        {jogador.nome}
                    </Text>
                </Pressable>
            ))}
        </View>

        
        <View style={styles.botoesContainer}>

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
                onPress={() => navigation.navigate("Politics")}
            />

        </View>

        
        <View style={styles.caixaLeis}>

            <Text style={styles.tituloLeis}>
                Leis aprovadas
            </Text>

            <Text style={styles.textoLei}>
                Passaram: {cartas.LibsPass} / 5 leis Liberais
            </Text>

            <Text style={styles.textoLei}>
                Passaram: {cartas.FascPass} / 6 leis Fascistas
            </Text>

            {cartas.Comu > 0 && (
                <Text style={styles.textoLei}>
                    Passaram: {cartas.ComuPass} / 6 leis Comunistas
                </Text>
            )}

            {cartas.Anar > 0 && (
                <Text style={styles.textoLei}>
                    Passaram: {cartas.AnarPass} / 3 leis Anarquistas 
                </Text>
            )}

        </View>

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
        backgroundColor: "#F4C430",
        alignItems: "center",
        paddingTop: 30,
        paddingHorizontal: 15,
    },

    titulo: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#3A2A00",
        marginBottom: 15,
    },

    playersContainer: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: 10,
    },

    jogador: {
        width: "42%",
        height: 55,
        margin: 6,
        borderRadius: 12,
        backgroundColor: "#FFF8DC",
        alignItems: "center",
        justifyContent: "center",
        elevation: 4,
    },

    jogadorTexto: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#3A2A00",
    },

    presidente: {
        backgroundColor: "#90EE90",
        borderWidth: 3,
        borderColor: "#B8860B",
    },

    chanceler: {
        backgroundColor: "#87CEEB",
        borderWidth: 3,
        borderColor: "#4682B4",
    },

    selecionado: {
        borderWidth: 4,
        borderColor: "#D32F2F",
    },

    botoesContainer: {
        width: "90%",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 10,
    },

    caixaLeis: {
        width: "90%",
        backgroundColor: "#FFF8DC",
        borderRadius: 15,
        padding: 15,
        alignItems: "center",
        elevation: 4,
    },

    tituloLeis: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#3A2A00",
        marginBottom: 8,
    },

    textoLei: {
        fontSize: 15,
        color: "#5C4A00",
        marginVertical: 3,
    },

});