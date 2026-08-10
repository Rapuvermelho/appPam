import { StyleSheet,Text,View,Button,TextInput,Image } from "react-native";
import React, {useContext,useState} from "react";
import {useApp} from '../context/AppContext';
import { funcs } from '../../assets/funcs';

const Setup = ({navigation}) => {

    const {nome,setNome} = useApp();
    const [njog,setNjog] = useState(0);

    function confjog(){
        //nao precisa switch,so um if,dai ele vai aumentado numero de player de acordo com a funcao
        switch(njog){
            case 1:

        }
        setNjog(n => n + 1);
        
    }

    return(
    <View style={styles.container}>
        <Text style={styles.ttopo}>Coloque o nome do {njog + 1} jogador</Text>
        <Button title="Vamos sortear as funções"
        onPress={()=> {navigation.navigate("Reveal")}}
        />
        <TextInput style={styles.ttopo}
            value={nome}
            onChangeText={setNome}
            placeholder="Coloque seu nome"
        />
<Button
    title="Confirmar jogador"
    onPress={confjog}
/>
        

<Image
    source={funcs.jub}
    style={{
        width: 200,
        height: 200,
    }}
/>
    </View>
    )
    
}

export default Setup

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ttopo:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
    fontSize: 20,
  }
});