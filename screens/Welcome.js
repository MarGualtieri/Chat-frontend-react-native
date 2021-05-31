import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";

import {
  ingles,
  espanol,
  frances,
  aleman,
  holandes,
} from "../components/banderas";
import logo from "../assets/logo.png";
import ReviewForm from './reviewForm'
//-----------------------------------FUNCIONES Y STATES--------------------------
export default function Welcome({ navigation }) {
  
  const idiomas = [
    { id: 1, name: "Ingles", idioma: ingles, check: false },
    { id: 2, name: "Español", idioma: espanol , check: false },
    { id: 3, name: "Frances", idioma: frances , check: false },
    { id: 4, name: "Aleman", idioma: aleman , check: false },
    { id: 5, name: "Holandes", idioma: holandes , check: false },
  ];
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [text, onChangeOrigen] = React.useState("Seleccione un idioma");
  const [modalOpen, setModalOpen] = useState(false);
  const [banderas, setBanderas] = useState(idiomas);

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

  function asignarOrigen(props) {
    onChangeOrigen(idiomas[props-1].name)
  }

  function checkFlag(index) {
    const bandera = {...idiomas[index-1], check: true};

    setBanderas(idiomas.map(item => (item.id === index) ? bandera : item))

  }


  {/*-----------------agregar elementosal  modal---------------*/ }


  const [valores, setValores] = useState([]);

  const enviarValores = (values) => {

    setModalOpen(false);
    console.log(values)

    values.key = Math.random().toString();
    setValores((currentReviews) => {
      return [values, ...currentReviews];
    });
    setModalOpen(false);


  };
  //----------------------------------APP--------------------------------------

  return (
    <ScrollView >
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <ImageBackground
            source={require("../assets/fondomenu.png")}
            style={styles.cover}
          >
            <View
              style={{
                flexDirection: "row",
                marginLeft: 15,
                marginTop: 0,
                paddingLeft: 0,
                paddingRight: 15,
                flex: 0,
              }}
            >
              {/*-----------------titulo boton amigos---------------*/}
              <TouchableOpacity
                onPress={() => navigation.navigate("Amigos", valores)}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <MaterialIcons
                  style={{ marginLeft: 8 }}
                  name="account-circle"
                  size={25}
                  color="white"
                />

                <Text
                  style={{
                    marginRight: 90,
                    marginLeft: 5,
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 15,
                  }}
                >
                  Amigos: 12
                </Text>
              </TouchableOpacity>
              {/*-----------------titulo nombre usuario---------------*/}
              <TouchableOpacity
                onPress={() => navigation.navigate("Perfil")}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Image source={espanol} style={styles.banderaIcon} />
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Lionel Messi
                </Text>
              </TouchableOpacity>


              {/*-----------------FIN DE BLOQUE---------------*/}
            </View>

            <View>
              <View style={{ flexDirection: "row", marginRight: 20 }}>
                <Image source={logo} style={styles.logo} />

                <TouchableOpacity onPress={openImagePicker}>
                  <Image
                    source={{
                      uri:
                        selectedImage !== null
                          ? selectedImage.localUri
                          : "https://upload.wikimedia.org/wikipedia/commons/d/d9/Lionel_Messi_20180626_%28cropped%29.jpg"
                    }}
                    style={styles.image}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/*-----------------MDOAL---------------*/}
        <Modal visible={modalOpen} animationType='slide' transparent={true}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContent}>
              <MaterialIcons
                name='close'
                size={24}
                style={styles.modalClose}
                onPress={() => setModalOpen(false)}
              />
              <ReviewForm enviarValores={enviarValores} style={styles.formik} />
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* icono por fuera del modal*/}
        <MaterialIcons
          name='add'
          size={24}
          style={styles.modalToggle}
          onPress={() => setModalOpen(true)}
        />

        <Text>llegarian valores:  </Text>




        {/*-----------------ELIJA UN IDIOMA---------------*/}
        <Text
          style={{
            fontSize: 20,
            color: "black",
            fontWeight: "bold",
            marginTop: 50,
          }}
        >
          Elige un idioma para iniciar
        </Text>
        <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>
          una conversacion en
        </Text>

        {/*-----------------BANDERAS---------------*/}
        <SafeAreaView>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            {
              banderas.map((idioma) => {
                return(
                  <TouchableOpacity onPress={() => {
                    asignarOrigen(idioma.id)
                    checkFlag(idioma.id)
                    }
                  }>
                    <Image
                      source={idioma.idioma}
                      style={idioma.check ? styles.banderaChecked : styles.bandera}
                    />
                  </TouchableOpacity>
                )
              })
            }

            {/*
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
             */}

          </View>

          <Text style={styles.input}>{text}</Text>

          <Text style={styles.continuar}>Continuar</Text>
        </SafeAreaView>
        <StatusBar style="light" />
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

  cover: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",
    //width: '100%',
    height: 211,
  },

  text: {
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
    height: 80,
    width: 80,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 40,

    //resizeMode:"contain",
  },

  input: {
    // SELECCIONE UN IDIOMA

    margin: 20,
    borderRadius: 30,
    backgroundColor: "#cf5475",
    color: "white",
    textAlign: "center",
    fontSize: 15,
    padding: 10,
  },
  continuar: {
    // SELECCIONE UN IDIOMA

    margin: 20,

    borderRadius: 30,
    backgroundColor: "#1F2937",
    color: "white",
    textAlign: "center",
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
  banderaChecked: {
    height: 50,
    width: 50,
    borderRadius: 50,
    borderColor: "blue",
    borderWidth: 4,
    marginTop: 30,
    marginLeft: 5,
  },

  banderaIcon: {
    height: 20,
    width: 20,
    borderRadius: 50,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 5,
  },

  logo: {
    height: 120,
    width: 120,
    marginRight: 90,
    borderRadius: 0,
    marginTop: 25,
    marginLeft: 40,
    resizeMode: "contain",
  },
  modalToggle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 1,
    borderWidth: 1,
    borderColor: "coral",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
    borderWidth: 2,
    borderColor: "coral",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  modalContent: {
    flex: 0.82, // en 1 toma toda la pantalla esto controla el alto del modal
    marginTop: 'auto', // usando valores empieza a recortar el modal desde abajo 
    backgroundColor: 'white',
    //width:'50%' recorta tambien
  },

  formik: {
    marginTop: 20,
    marginBottom: 0,
    borderWidth: 2,
    borderColor: "coral",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
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
});
