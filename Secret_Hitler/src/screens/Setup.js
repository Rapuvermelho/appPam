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
    <View>
        <View style={styles.nbox}>
            <Text style={styles.ttopo}>Coloque o nome do {njog + 1} jogador</Text>
            <TextInput style={styles.tinput}
                value={natual}
                onChangeText={setNatual}
                placeholder="Coloque seu nome"
            />
            <MyButton
                title="Confirmar jogador"
                onPress={confjog}
            />
            <View style={styles.funcsContainer}>
                {jogadores.map((jogadores, index) => (
                    <Text key={index}>{jogadores.nome}</Text>
                ))}
            </View>
        </View>


        <MyButton title="Vamos sortear as funções"
            onPress={()=> {
                sortfunc()
                navigation.navigate("Reveal")
            }}
        />


        
        <View style={styles.funcsContainer}>
                {funcoes.map((func, index) => (
                    <View key={index}>
                        <Text>{nfuncs[index][njog-1]}-{tfuncs[index]}</Text>
                        <Image
                            source={funcs[func]}
                            style={{
                                width: 80,
                                height: 80,
                            }}
                        />
                    </View>
                ))}
        </View>
        <Image source={sh}/>
   </View> )


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
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nbox:{
    alignItems: 'center',
    paddingTop: 20,
  },
  ttopo:{
    paddingTop: 10,
    fontSize: 20,
    justifyContent:'center',
  },
  tgenerico:{
    paddingTop: 10,
    fontSize: 15,
    justifyContent:'center',
  },
  tinput:{
    width: '80%',
    height: 50,
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  funcsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
},
});