import { StyleSheet,Text,View,Button,TextInput,Image } from "react-native";
import React, {useContext,useState} from "react";
import {useApp} from '../context/AppContext';
import { funcs } from '../../assets/funcs';
import MyButton from "../components/MyButton";

const Setup = ({navigation}) => {

    const {natual,setNatual} = useApp();
    const {jogadores,setJogadores} = useApp();
    const [njog,setNjog] = useState(0);
    const [funcoes, setFuncoes] = useState([]);
    const nfuncs = [[1,1,1,2,3,4,4,5,4,4,4,4,4,4]
    ,[0,1,1,1,1,1,2,2,2,2,2,2,2,2,2,]
    ,[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ,[0,0,0,0,0,0,0,0,2,2,2,2,2,2,2],[0,0,0,0,0,0,0,0,0,1,1,1,1,1],[0,0,0,0,0,0,0,0,0,0,1,1,1,1]];
    const tfuncs = ["Liberal","Fascista","Hitler","Comunista","Capitalista","Anarquista"]; 
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
   </View> )


   //funcoes
   function confjog(){
        //nao precisa switch,so um if,dai ele vai aumentado numero de player de acordo com a funcao
        if(njog == 0){
            setFuncoes(prev => [...prev, 'jub']);
            setFuncoes(prev => [...prev, 'mag']);
            setFuncoes(prev => [...prev, 'x']);
            //print facismo 1 + h e 3 l
            // 8  9 de importante e 10
        }
        else if (njog == 8){
            //print comunas sem capi
            setFuncoes(prev => [...prev, 'jub']);
        }
        else if(njog == 9){
            //comunas e capit
            setFuncoes(prev => [...prev, 'mag']);
        }
        else if(njog == 10){
            //comunas,capit e anaq
            setFuncoes(prev => [...prev, 'x']);
        }

        setJogadores(prev => [...prev, 
            {
                nome:natual,
                funcao: null,
                vivo: true,
                pres: false,
                chan: false,

            }]);
        setNatual(' ');
        
        setNjog(n => n + 1);
        
    }

    function sortfunc(){
        const tempFunc = [];
        for (let i = 0; i < nfuncs.length; i++) {
            const qtd = nfuncs[i][njog];

            for (let j = 0; j < qtd; j++) {
                tempFunc.push(tfuncs[i]);
            }
        }
            setJogadores(prev =>
            prev.map((jogador, index) => ({
                ...jogador,
                funcao: tempFunc[index],
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