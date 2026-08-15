import { StyleSheet,Text,View,Button,TextInput,Image } from "react-native";
import React, {useContext,useState} from "react";
import {useApp} from '../context/AppContext';
import { funcs } from '../../assets/funcs';
import MyButton from "../components/MyButton";
import sh from "../../assets/sh.webp"

const Setup = ({navigation}) => {

    const {natual,setNatual} = useApp();
    const {jogadores,setJogadores} = useApp();
    const {cartas,setCartas} = useApp();
    const [njog,setNjog] = useState(0);
    const [funcoes, setFuncoes] = useState([]);
    const nfuncs = [[1,1,1,2,3,4,4,5,4,4,4,4,4,4]
    ,[0,1,1,1,1,1,2,2,2,2,2,2,2,2,2,]
    ,[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ,[0,0,0,0,0,0,0,0,2,2,2,2,2,2,2],[0,0,0,0,0,0,0,0,0,1,1,1,1,1],[0,0,0,0,0,0,0,0,0,0,1,1,1,1]];
    const tpart = [["Liberal","Libera"],["Fascista","Fascista"],["Hitler","Fascista"],["Comunista","Comunista"],
    ["Capitalista","Capitalista"],["Anaquista","Comunista"]]
    const tfuncs = ["Liberal","Fascista","Hitler","Comunista","Capitalista","Anarquista"];
    let cartcomu = 0
    let cartanar = 0
    let cartfas = 0

    return(
    <View style={styles.container}>

        <Text style={styles.titulo}>
        SECRET HITLER
        </Text>

        <Text style={styles.subtitulo}>
        Configuração do jogo
        </Text>

        <View style={styles.caixaSetup}>

        <Text style={styles.tituloJogador}>
            Coloque o nome do jogador {njog + 1}
        </Text>

        <TextInput
            style={styles.entradaNome}
            value={natual}
            onChangeText={setNatual}
            placeholder="Coloque seu nome"
            placeholderTextColor="#999"
        />

        <MyButton
            title="Confirmar jogador"
            onPress={confjog}
        />

        <Text style={styles.tituloJogadores}>
            Jogadores adicionados
        </Text>

        <View style={styles.listaJogadores}>
            {jogadores.map((jogadores, index) => (
            <View key={index} style={styles.jogador}>
                <Text style={styles.nomeJogador}>
                {jogadores.nome}
                </Text>
            </View>
            ))}
        </View>

        </View>

        <Text style={styles.tituloFuncoes}>
        Funções disponíveis
        </Text>

        <View style={styles.listaFuncoes}>
        {funcoes.map((func, index) => (
            <View key={index} style={styles.caixaFuncao}>

            <Image
                source={funcs[func]}
                style={styles.imagemFuncao}
            />

            <Text style={styles.nomeFuncao}>
                {tfuncs[index]}
            </Text>

            <Text style={styles.quantidadeFuncao}>
                {nfuncs[index][njog - 1] || 0}
            </Text>

            </View>
        ))}
        </View>

        <MyButton
        title="Vamos sortear as funções"
        onPress={() => {
            sortfunc();
            navigation.navigate("Reveal");
        }}
        />

        <Image
        source={sh}
        style={styles.logo}
        />

    </View>
    )


   //funcoes
   function confjog(){
        //nao precisa switch,so um if,dai ele vai aumentado numero de player de acordo com a funcao
        if(njog == 0){
            setFuncoes(prev => [...prev, 'lib']);
            setFuncoes(prev => [...prev, 'fas']);
            setFuncoes(prev => [...prev, 'hit']);
            //print facismo 1 + h e 3 l
            // 8  9 de importante e 10
            cartfas = 11
        }
        else if (njog == 8){
            //print comunas sem capi
            setFuncoes(prev => [...prev, 'com']);
            cartcomu = 9
            cartfas = 9
        }
        else if(njog == 9){
            //comunas e capit
            setFuncoes(prev => [...prev, 'cap']);
        }
        else if(njog == 10){
            //comunas,capit e anaq
            setFuncoes(prev => [...prev, 'ana']);
            cartanar = 1
        }

        setCartas({
            Libs: 6,
            Fasc: cartfas,
            Comu: cartcomu,
            Anar: cartanar,
            LibsPass: 0,
            FascPass: 0,
            ComuPass: 0,
            AnarPass: 0,
            Desc: 0,
            Total: 6+cartfas+cartanar+cartcomu,
        })

        setJogadores(prev => [...prev, 
            {
                nome:natual,
                funcao: null,
                partido: null,
                vivo: true,
                pres: false,
                chan: false,

            }]);
        setNatual(' ');
        
        setNjog(n => n + 1);
        
    }

    function sortear(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

             [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function sortfunc(){
        const tempFunc = [];
        for (let i = 0; i < nfuncs.length; i++) {
            const qtd = nfuncs[i][njog-1];

            
            for (let j = 0; j < qtd; j++) {
                tempFunc.push(tfuncs[i])

            }
        }

        sortear(tempFunc)
            setJogadores(prev =>
            prev.map((jogador, index) => ({
                ...jogador,
                funcao: tempFunc[index],
                partido: tpart[tfuncs.indexOf(tempFunc[index])][1],
            }))
        );
    }
}

export default Setup

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F4C430",
    alignItems: "center",
    paddingTop: 35,
    paddingHorizontal: 15,
  },

  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2E2300",
  },

  subtitulo: {
    fontSize: 17,
    color: "#5C4A00",
    marginBottom: 20,
  },

  caixaSetup: {
    width: "95%",
    backgroundColor: "#FFF8DC",
    borderRadius: 15,
    padding: 18,
    alignItems: "center",
    elevation: 5,
  },

  tituloJogador: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#3A2A00",
    marginBottom: 12,
    textAlign: "center",
  },

  entradaNome: {
    width: "90%",
    height: 48,
    borderWidth: 1,
    borderColor: "#B99A00",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 17,
    backgroundColor: "white",
    marginBottom: 10,
  },

  tituloJogadores: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5C4A00",
    marginTop: 15,
    marginBottom: 8,
  },

  listaJogadores: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 6,
  },

  jogador: {
    backgroundColor: "#F4C430",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  nomeJogador: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#3A2A00",
  },

  tituloFuncoes: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3A2A00",
    marginTop: 18,
    marginBottom: 8,
  },

  listaFuncoes: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginBottom: 15,
  },

  caixaFuncao: {
    width: 95,
    height: 115,
    backgroundColor: "#FFF8DC",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  imagemFuncao: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },

  nomeFuncao: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#3A2A00",
    marginTop: 3,
  },

  quantidadeFuncao: {
    fontSize: 12,
    color: "#6B5700",
  },

  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginTop: 5,
  },

});