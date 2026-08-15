import { StyleSheet,Text,View,Button,Image } from "react-native";
import React from "react";
import trofeu from "../../assets/trofeu.jpeg";

const Victory = ({navigation}) => {
    return(
    <View style={styles.container}>
        <Text>Parabéns,vc ganhou</Text>
        <Image
            source={victoryImage}
            style={styles.image}
        />
    </View>
    )
}

export default Victory

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});