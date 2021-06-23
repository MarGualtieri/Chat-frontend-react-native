import * as ImagePicker from "expo-image-picker";

import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  aleman,
  espanol,
  frances,
  holandes,
  ingles,
} from "../components/Flags";

import AsyncStorage from "../utils/AsyncStorage";
import GlobalContext from "../components/global/context/index";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import logo from "../assets/logo.png";

//-----------------------------------Functions and States--------------------------
export default function Welcome({ navigation }) {

  const { authData, setAuthData, applyLogout } = useContext(GlobalContext);
  const [flagUser, setFlagUser] = useState(0);

  //const [currentUser, setCurrentUser] = useState({});


  const bringUser = async () => {
    const storedUser = await AsyncStorage.getData('@userData');
    if (storedUser) {
      setAuthData(storedUser)
    }

  }

  useEffect(() => {

    bringUser()
    setFlagUser(Math.floor(Math.random()*5))

  }, []);


  const languages = [
    { id: 1, name: "English", idioma: ingles, check: false },
    { id: 2, name: "Spanish", idioma: espanol, check: false },
    { id: 3, name: "French", idioma: frances, check: false },
    { id: 4, name: "German", idioma: aleman, check: false },
    { id: 5, name: "Dutch", idioma: holandes, check: false },
  ];

  const [selectedImage, setSelectedImage] = useState(null);
  const [text, onChangeOrigen] = React.useState("Choose a language");


  const [banderas, setBanderas] = useState(languages);

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

  {
    /*-----------------Flag Highlight---------------*/
  }

  function asignarOrigen(props) {
    onChangeOrigen(languages[props - 1].name);
  }

  function checkFlag(index) {
    const bandera = { ...languages[index - 1], check: true };
    setBanderas(languages.map((item) => (item.id === index ? bandera : item)));
  }

  //----------------------------------APP--------------------------------------

  return (
    <ScrollView>
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
                onPress={() => navigation.navigate("Friends")}
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
                  Friends: 12
                </Text>
              </TouchableOpacity>
              {/*-----------------titulo nombre usuario---------------*/}
              <TouchableOpacity

                onPress={() => navigation.navigate("Profile")}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Image source={languages[flagUser].idioma} style={styles.banderaIcon} />
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {authData.name}
                </Text>
              </TouchableOpacity>

              {/*-----------------FIN DE BLOQUE---------------*/}
            </View>

            <View>
              <View style={{ flexDirection: "row", marginRight: 20 }}>
                <Image source={logo} style={styles.logo} />
                <TouchableOpacity onPress={openImagePicker}>

                  {selectedImage == null && (
                    <Image
                      source={{
                        uri: authData.photoUrl ? authData.photoUrl : `https://source.boringavatars.com/bauhaus/120/${authData.name}?colors=FFFFFF,EDF3A2,6EEEF1,292C37,10B981`,
                      }}
                      style={styles.image}
                    />

                  )}
                  {selectedImage !== null && (
                    <Image
                      source={{
                        uri: selectedImage.localUri,
                      }}
                      style={styles.image}
                    />
                  )}

                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/*-----------------ELIJA UN IDIOMA---------------*/}
        <Text
          style={{
            fontSize: 20,
            color: "black",
            fontWeight: "bold",
            marginTop: 50,
          }}
        >
          Choose a language to start
        </Text>
        <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>
          a conversation
        </Text>
        {/*-----------------BANDERAS---------------*/}
        <SafeAreaView>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            {
              banderas.map((idioma) => {
                return (
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
          </View>

          <Text style={styles.input}>{text}</Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Chat", { languageRoom: text })

            }}
          >
            <Text style={styles.continuar}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              applyLogout()

            }}
          >
            <Text style={styles.logout}>Logout</Text>
          </TouchableOpacity>

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
    // CONTINUAR
    marginVertical: 0,
    margin: 20,
    borderRadius: 30,
    backgroundColor: "#10B981",
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
    borderRadius: 10,
    marginTop: 30,
    marginLeft: 5,
  },
  banderaChecked: {
    height: 50,
    width: 50,
    borderRadius: 50,
    borderColor: "blue",
    borderWidth: 3,
    marginTop: 30,
    marginLeft: 5,
  },
  banderaIcon: {
    height: 25,
    width: 25,
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
    marginTop: "auto", // usando valores empieza a recortar el modal desde abajo
    backgroundColor: "white",
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
    flexDirection: "row"
  },
  logout: {
    backgroundColor: "#1F2937",
    marginVertical: 10,
    margin: 20,
    borderRadius: 30,
    color: "white",
    textAlign: "center",
    fontSize: 15,
    padding: 10,
  }
});
