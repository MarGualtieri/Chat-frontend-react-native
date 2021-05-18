import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import {
  ingles,
  español,
  frances,
  aleman,
  holandes,
} from "../components/banderas";
import logo from "../assets/logo.png";


//-----------------------------------FUNCIONES Y STATES--------------------------
export default function Welcome() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [text, onChangeOrigen] = React.useState("Seleccione un idioma");

  let openImagePicker = async () => {
    let permissionResult = ImagePicker.requestMediaLibraryPermissionsAsync;

    if (permissionResult.granted === false) {
      alert("El permiso para acceder a la camara es requerido");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
    return pickerResult;
  };

  const idiomas = [
    { id: 1, name: "Ingles", idioma: { ingles } },
    { id: 2, name: "Español", idioma: { español } },
    { id: 3, name: "Frances", idioma: { frances } },
    { id: 4, name: "Aleman", idioma: { aleman } },
    { id: 5, name: "Holandes", idioma: { holandes } },
  ];

  function asignarOrigen(props) {
    switch (props) {
      case 0:
        onChangeOrigen(idiomas[0].name);
        break;
      case 1:
        onChangeOrigen(idiomas[1].name);
        break;
      case 2:
        onChangeOrigen(idiomas[2].name);
        break;
      case 3:
        onChangeOrigen(idiomas[3].name);
        break;
      case 4:
        onChangeOrigen(idiomas[4].name);
        break;

      default:
        break;
    }
  }

  //----------------------------------APP--------------------------------------

  return (
    <ScrollView style={{ width: "100%" }}>
      <View style={styles.container}>
        <View style={styles.backgroundMenu}>
          <ImageBackground
            source={require("../assets/fondomenu.png")}
            style={styles.cover}
          >
            
            <View style={styles.titulosMenu}>
            <Text style={{ marginRight: 150 ,color:"white",fontWeight: "bold"}}>Amigos: 12</Text>
            <Text style={{color:"white",fontWeight: "bold"}}>Sebastian Ortega</Text>
            </View>
            
           <View>


           <View style={styles.titulosMenu2}>

          <Image source={logo} style={styles.logo} />

          <TouchableOpacity onPress={openImagePicker}>
            <Image
              source={{
                uri:
                  selectedImage !== null
                    ? selectedImage.localUri
                    : "http://picsum.photos/100/100",
              }}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>


           </View>

          </ImageBackground>
        </View>

        <View style={styles.menu}>
          <Image source={español} style={styles.bandera} />
        </View>

      
        <StatusBar style="auto" />

        <SafeAreaView>
          <View style={styles.vistaBandera}>
            <TouchableOpacity onPress={() => asignarOrigen(0)}>
              <Image source={ingles} style={styles.bandera} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => asignarOrigen(1)}>
              <Image source={español} style={styles.bandera} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => asignarOrigen(2)}>
              <Image source={frances} style={styles.bandera} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => asignarOrigen(3)}>
              <Image source={aleman} style={styles.bandera} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => asignarOrigen(4)}>
              <Image source={holandes} style={styles.bandera} />
            </TouchableOpacity>
          </View>

          <Text style={styles.input}>{text}</Text>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
}

//----------------------------------ESTILOS-----------------------------------

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  backgroundMenu: {
    // fondo menu principal
    //flexDirection: "row",
    //justifyContent: "center",
    //flex: 1,
    //backgroundColor: "white",
    //alignItems: "center",
    //width: "100%",
    //height: "20%",
    //resizeMode: "contain",
    //resizeMode: "cover",
    flex: 1,
    flexDirection: "column",
  },

  cover: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: 371,
    height: 211,
  },

  text: {
    // fondo de talki
    fontSize: 30,
    color: "white",
    backgroundColor: "white",
    justifyContent: "center",
    //width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    alignItems: "center",
  },

  buttonRed: {
    // boton rojo
    backgroundColor: "#1F2937",
    marginTop: 50,
    borderRadius: 50,
    padding: 20,
  },

  buttonBlue: {
    // EDITAR PERFOL DE USUARIO
    backgroundColor: "#10B981",
    marginTop: 20,
    borderRadius: 50,
    padding: 30,
  },

  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 80,

    //resizeMode:"contain",
  },

  input: {
    // SELECCIONE UN IDIOMA

    margin: 20,
    borderRadius: 30,
    backgroundColor: "#cf5475", // ROSA
    color: "white",
    textAlign: "center",
    //fontWeight: 'bold',
    fontSize: 15,
    padding: 10,
  },
  textoIdioma: {
    marginTop: 0,
    height: 0,
    margin: 0,
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  bandera: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginTop: 30,
    marginLeft: 5,
  },
  vistaBandera: {
    flexDirection: "row",
    marginTop: 5,
  },
  
  titulosMenu: {
    flexDirection: "row",
    marginLeft: 15,
    //marginBottom:150,
  },
  titulosMenu2: {
    flexDirection: "row",
    //marginLeft: 20,
    marginRight: 20,
    //marginBottom:150,
  },

  logo: {
    height: 120,
    width: 120,
    marginRight:80,
    borderRadius: 0,
    marginTop: 25,
    marginLeft:40,
   
    resizeMode: "contain",
  },
});
