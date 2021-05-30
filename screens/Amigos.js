import React, { useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { globalStyles, images } from "../styles/global";

const corazones = [
  {
    foto: require("../assets/rating-1.png"),
  },
  {
    foto: require("../assets/rating-2.png"),
  },
  {
    foto: require("../assets/rating-3.png"),
  },
];

export default function Amigos({ navigation}) {
  
  
 


  const [reviews, setReviews] = useState([
    {
      Nombre: "Pedro Sanchez ",
      Idioma: "Español",
      Ubicacion: "Panama",
      Rating: 1,
      key: "1",
    },
    {
      Nombre: "Maria Dival ",
      Idioma: "Español",
      Ubicacion: "Chile",
      Rating: 3,
      key: "2",
    },
    {
      Nombre: "Jeniffer Lopez ",
      Idioma: "Ingles",
      Ubicacion: "Canada",
      Rating: 2,
      key: "3",
    },
  ]);

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <View style={styles.flat}>
            <View style={styles.container}>
              <Text style={styles.flat}>Nombre: {item.Nombre} </Text>
              <Text style={styles.flat}>Idioma: {item.Idioma} </Text>
              <Text style={styles.flat}>Ubicacion:{item.Ubicacion}</Text>
          
             <View style={styles.valoraciones}>
            <Text style={{color: 'indigo',fontWeight:'bold',marginHorizontal:15}}>Valoraciones</Text>
             <Image
                style={styles.imageIcon}
                source={corazones[item.Rating - 1].foto}
              />
             </View>
             
            </View>
            <View style={styles.container2}>
              <Image
                style={styles.image}
                source={{
                  uri: "http://picsum.photos/100/100",
                }}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flat: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "coral",
    padding: 5,
    marginTop: 5,
    borderRadius: 10,
    flexDirection: "row",
    //flexWrap: 'wrap',
    //alignItems: "center",
    //justifyContent: "center",
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 50,
    //marginTop: 20,
    // marginBottom: 20,
    //marginRight: 40,
    flex: 1,
    resizeMode: "contain",
  },

  row: {
    flexDirection: "row",
    flex: 1,
  },
  container: {
    //backgroundColor: "yellow",
    width: "70%",
  },
  container2: {
    //backgroundColor: "indigo",
    width: "30%",
  },


  imageIcon: {
    width: 60,
    height: 20,
    flex: 1,
    resizeMode: "contain",
  },
  valoraciones: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop:16,
    marginTop:16,
    borderTopWidth:1,
    borderTopColor:'white',
    width:'70%'
  
  },
});
