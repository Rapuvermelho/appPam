import { StyleSheet,Text,View,Button } from "react-native";
import React from "react";

const Setup = ({navigation}) => {
    return(
    <View style={styles.container}>
        <Text>Setup</Text>
        <Button
        onPress={()=> {navigation.navigate("Reveal")}}
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
});