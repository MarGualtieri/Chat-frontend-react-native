import {
  StyleSheet,
  TextInput,
  View,
  Button,
  ScrollView,
  Text,
} from "react-native";
import React, { useState, useContext } from "react";
import GlobalContext from "../components/global/context";
import ListaPerfil from "../components/ListaPerfil";

{
  /*-----------------INICIO DE LA APLICACION---------------*/
}

export default function Perfil({ route, navigation }) {
  const { userId } = route.params;
  const {authData} = useContext(GlobalContext);

  const [nombre, setNombre] = useState(authData.nombre);
  const [idioma, setIdioma] = useState(authData.idioma);
  const [edad, setEdad] = useState(authData.edad);

  const guardarCambios = () => {
    authData.cambioPerfil(nombre, edad, idioma);
    navigation.navigate("Welcome");
  };

  {
    /*-----------------USUARIOS BACKEND---------------*/
  }

  const textHandlerNombre = (event) => {
    setNombre(event.target.value);
  };
  const textHandlerIdioma = (event) => {
    setIdioma(event.target.value);
  };
  const textHandlerEdad = (event) => {
    setEdad(event.target.value);
  };

  const USUARIOS = "https://apichathello.herokuapp.com/users/" + userId;

  //const USUARIOS = "http://localhost:3000/users/"+userId;

  function editarNombre() {
    fetch(USUARIOS, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre,
        idioma: idioma,
        edad: edad,
      }),
    })
      .then((res) => {
        alert("cambio realizado con exito");
        guardarCambios();
      })
      .catch((error) => alert(error.message));
  }

  {
    /*-----------------app---------------*/
  }

  return (
    <ScrollView style={{ width: "100%" }}>
      <View style={styles.container}>
        <View style={styles.fondo}>
          <View>
            <Text style={styles.title}>BIENVENIDO A SU PERFIL</Text>
            <ListaPerfil
              textNombre={nombre}
              textIdioma={idioma}
              textEdad={edad}
            />
          </View>

          {/*-----------------TEST USUARIOS---------------*/}
          <View style={styles.flatContainer}>
            <View style={styles.container2}>
              <View style={styles.fondo2}>
                <Text style={styles.title}>AQUI PUEDE MODIFICAR SUS DATOS</Text>
              </View>
              <TextInput
                style={styles.flat}
                onChangeText={(text) => setNombre(text)}
                onChange={textHandlerNombre}
                placeholder=" edite su nombre"
              />

              <TextInput
                style={styles.flat}
                onChangeText={(text) => setIdioma(text)}
                onChange={textHandlerIdioma}
                placeholder=" edite su idioma"
              />

              <TextInput
                style={styles.flat}
                onChangeText={(text) => setEdad(text)}
                onChange={textHandlerEdad}  
                placeholder=" edite su edad"
                keyboardType="numeric"
              />
              <View style={{ marginHorizontal: 60, marginVertical: 20 }}>
                <Button
                  onPress={editarNombre}
                  title="GUARDAR CAMBIOS"
                  color="#841584"
                />
              </View>
            </View>
          </View>

          {/*-----------------FIN DE BLOQUE---------------*/}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "coral",
  },

  fondo: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff0f0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 8,
  },
  tex: {
    fontSize: 20,
    marginVertical: 20,
  },
  flat: {
    flex: 1,
    width: "85%",
    marginVertical: 10,
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    backgroundColor: "white",
    alignItems: "center",
    padding: 5,
    marginTop: 5,
    borderRadius: 10,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 8,
  },

  container2: {
    width: "100%",
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 8,
  },

  flatContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "coral",
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 8,
  },
  title: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    alignItems: "center",
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 8,
  },
  fondo2: {
    backgroundColor: "#fff0f0",
    flex: 1,
    width: "100%",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 8,
  },
});
