  import { StyleSheet,Text,View,Button,Pressable,Image } from "react-native";
  import React, { useState } from "react";
  import { useApp } from "../context/AppContext";
  import MyButton from "../components/MyButton";
  import { cardImages } from "../../assets/cards/cards";

  const Politics = ({navigation}) => {

      const {cartas,setCartas} = useApp();
      const [mao, setMao] = useState([]);
      const {jogadores} = useApp();
      const [cartasSelecionadas, setCartasSelecionadas] = useState([]);
      const [comprou, setComprou] = useState(false);
      const [descartes,setDescartes] = useState(0);

      return(
      <View style={styles.container}>

        {!comprou && (
      <MyButton 
          title="Veja as cartas"
          onPress={comprarCartas}
      />
  )}

  <View style={styles.cartaContainer}>
      {mao.map((carta, index) => (
          <Pressable
              key={index}
              style={[
                  styles.carta,
                  cartasSelecionadas.includes(index) && styles.cartaSelecionada,
              ]}
              onPress={() => selecionarCarta(index)}
          >
              <Image
                  source={cardImages[carta]}
                  style={styles.cartaImagem}
              />
          </Pressable>
      ))}
  </View>
          {cartasSelecionadas.length > 0 && (
      <MyButton
          title="Descartar"
          onPress={descartar}
      />
  )}
      </View>
      )

  function comprarCartas() {
      const nCartas = [];

      let total = cartas.Total;

      if (total < 3) {
          total = total + cartas.Desc;

          setCartas(prev => ({
              ...prev,
              Total: prev.Total + prev.Desc,
              Desc: 0
          }));
      }
      for (let i = 0; i < 3; i++) {

          let max = 4;
          if (cartas.Comu == 0 && cartas.Anar == 0) {
              max = 2;
          } else if (cartas.Anar == 0) {
              max = 3;
          }
          const n = Math.floor(Math.random() * max) + 1;

          let tipo;

          if (n == 1) {
              tipo = "Libs";

              setCartas(prev => ({
                  ...prev,
                  Libs: prev.Libs - 1,
                  Total: prev.Total - 1
              }));
          }

          if (n == 2) {
              tipo = "Fasc";

              setCartas(prev => ({
                  ...prev,
                  Fasc: prev.Fasc - 1,
                  Total: prev.Total - 1
              }));
          }

          if (n == 3 ) {
              tipo = "Comu";

              setCartas(prev => ({
                  ...prev,
                  Comu: prev.Comu - 1,
                  Total: prev.Total - 1
              }));
          }

          if (n == 4 ) {
              tipo = "Anar";

              setCartas(prev => ({
                  ...prev,
                  Anar: prev.Anar - 1,
                  Total: prev.Total - 1
              }));
          }

          nCartas.push(tipo);
      }

      setCartas(prev => ({
          ...prev,
          Desc: prev.Desc + 2
      }));
      setComprou(true);
      setMao(nCartas);
  }
  function selecionarCarta(index) {
      if (cartasSelecionadas.includes(index)) {
          setCartasSelecionadas(
              cartasSelecionadas.filter(i => i !== index)
          );
      } 
      else if (cartasSelecionadas.length < 1) {
          setCartasSelecionadas([
              ...cartasSelecionadas,
              index
          ]);
      }
  }
  function descartar() {
      if (descartes < 1) {

          const cartasRestantes = mao.filter(
              (_, index) => !cartasSelecionadas.includes(index)
          );

          setMao(cartasRestantes);
          setCartasSelecionadas([]);
          setDescartes(descartes + 1);

      } else {

          const cartaPass = mao.filter(
              (_, index) => !cartasSelecionadas.includes(index)
          )[0];

          if (cartaPass === "Libs") {
              setCartas(prev => ({
                  ...prev,
                  LibsPass: prev.LibsPass + 1
              }));
              if(cartas.LibsPass == 4){
                navigation.navigate("Victory");
                 return;
              }
          }

          if (cartaPass === "Fasc") {
              setCartas(prev => ({
                  ...prev,
                  FascPass: prev.FascPass + 1
              }));
              if(cartas.FascPass == 5){
                navigation.navigate("Victory");
                 return;
              }
          }

          if (cartaPass === "Comu") {
              setCartas(prev => ({
                  ...prev,
                  ComuPass: prev.ComuPass + 1
              }));
              if(cartas.ComuPass == 5){
                navigation.navigate("Victory");
                 return;
              }
          }

          if (cartaPass === "Anar") {
              setCartas(prev => ({
                  ...prev,
                  AnarPass: prev.AnarPass + 1
              }));
              if(cartas.AnarPass == 2){
                navigation.navigate("Victory");
                return;
              }
          }

          setDescartes(0);
          navigation.navigate("Table");
      }
  }
  }

  export default Politics

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'pink',
      alignItems: 'center',
      justifyContent: 'center',
    },
  cartaContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 15,
  },

  carta: {
      width: 100,
      height: 150,
      borderRadius: 10,
      backgroundColor: "white",
      overflow: "hidden",
      elevation: 8,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 3,
      },
      shadowOpacity: 0.3,
      shadowRadius: 5,
  },

  cartaImagem: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
  },
  cartaSelecionada: {
      borderWidth: 5,
      borderColor: "red",
      transform: [
          { translateY: -15 }
      ],
  },
  });